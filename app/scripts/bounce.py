#!/usr/bin/env python3
"""
Bring up the local CTO dashboard from a clean-ish state.

The script is intentionally scoped to the app directory:
- installs npm dependencies
- clears generated frontend output
- restarts the local Postgres container
- frees the app ports
- starts the React dashboard and API
"""

from __future__ import annotations

import argparse
import os
import shutil
import signal
import socket
import subprocess
import sys
import time
import urllib.request
import webbrowser
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parents[1]
WEB_PORT = 5555
API_PORT = 5556
DB_PORT = 55432
WEB_URL = f"http://localhost:{WEB_PORT}"
API_HEALTH_URL = f"http://localhost:{API_PORT}/api/health"
RUNTIME_DIR = APP_ROOT / ".bounce"
DEV_LOG_PATH = RUNTIME_DIR / "dev-server.log"
DEV_PID_PATH = RUNTIME_DIR / "dev-server.pid"


def log(message: str) -> None:
    print(f"[bounce] {message}", flush=True)


def run(command: list[str], *, check: bool = True) -> subprocess.CompletedProcess[str]:
    log("$ " + " ".join(command))
    return subprocess.run(command, cwd=APP_ROOT, check=check, text=True)


def require(command: str) -> None:
    if shutil.which(command) is None:
        raise SystemExit(f"Missing required command: {command}")


def remove_generated_files() -> None:
    for relative in ("dist", "node_modules/.vite"):
        target = APP_ROOT / relative
        if target.exists():
            log(f"removing generated path: {relative}")
            shutil.rmtree(target)


def listening_pids(port: int) -> list[int]:
    if shutil.which("lsof") is None:
        return []
    result = subprocess.run(
        ["lsof", "-ti", f"tcp:{port}", "-sTCP:LISTEN"],
        cwd=APP_ROOT,
        text=True,
        capture_output=True,
        check=False,
    )
    pids: list[int] = []
    for line in result.stdout.splitlines():
        line = line.strip()
        if line.isdigit():
            pids.append(int(line))
    return pids


def process_command(pid: int) -> str:
    result = subprocess.run(
        ["ps", "-p", str(pid), "-o", "command="],
        text=True,
        capture_output=True,
        check=False,
    )
    return result.stdout.strip()


def terminate_pid(pid: int) -> None:
    command = process_command(pid)
    log(f"stopping pid {pid}: {command or 'unknown command'}")
    try:
        os.kill(pid, signal.SIGTERM)
    except ProcessLookupError:
        return

    for _ in range(20):
        try:
            os.kill(pid, 0)
        except ProcessLookupError:
            return
        time.sleep(0.25)

    log(f"pid {pid} did not exit; sending SIGKILL")
    try:
        os.kill(pid, signal.SIGKILL)
    except ProcessLookupError:
        return


def free_app_ports() -> None:
    for port in (WEB_PORT, API_PORT):
        pids = listening_pids(port)
        if not pids:
            log(f"port {port} is free")
            continue
        for pid in pids:
            terminate_pid(pid)


def wait_for_port(host: str, port: int, timeout_seconds: int) -> None:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(1)
            if sock.connect_ex((host, port)) == 0:
                return
        time.sleep(1)
    raise SystemExit(f"Timed out waiting for {host}:{port}")


def wait_for_http(url: str, timeout_seconds: int) -> None:
    deadline = time.time() + timeout_seconds
    last_error: Exception | None = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if 200 <= response.status < 300:
                    return
        except Exception as error:  # noqa: BLE001 - diagnostics are printed on timeout.
            last_error = error
        time.sleep(1)
    detail = f" Last error: {last_error}" if last_error else ""
    raise SystemExit(f"Timed out waiting for {url}.{detail}")


def wait_for_http_or_exit(url: str, timeout_seconds: int, process: subprocess.Popen[str]) -> None:
    deadline = time.time() + timeout_seconds
    last_error: Exception | None = None
    while time.time() < deadline:
        if process.poll() is not None:
            raise SystemExit(
                f"Dev server exited early with code {process.returncode}. "
                f"See {DEV_LOG_PATH}."
            )
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if 200 <= response.status < 300:
                    return
        except Exception as error:  # noqa: BLE001 - diagnostics are printed on timeout.
            last_error = error
        time.sleep(1)
    detail = f" Last error: {last_error}" if last_error else ""
    raise SystemExit(f"Timed out waiting for {url}.{detail} See {DEV_LOG_PATH}.")


def start_dev_server(*, open_browser: bool) -> int:
    RUNTIME_DIR.mkdir(exist_ok=True)
    log(f"starting dashboard dev servers in background; log: {DEV_LOG_PATH}")
    log_file = DEV_LOG_PATH.open("a", encoding="utf-8")
    log_file.write(f"\n\n[bounce] starting npm run dev at {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
    log_file.flush()
    process = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=APP_ROOT,
        stdin=subprocess.DEVNULL,
        stdout=log_file,
        stderr=subprocess.STDOUT,
        text=True,
        start_new_session=True,
    )
    log_file.close()
    DEV_PID_PATH.write_text(f"{process.pid}\n", encoding="utf-8")
    try:
        wait_for_http_or_exit(API_HEALTH_URL, 90, process)
        wait_for_http_or_exit(WEB_URL, 90, process)
        log(f"dashboard ready: {WEB_URL}")
        log(f"dev server pid: {process.pid}")
        if open_browser:
            webbrowser.open(WEB_URL)
        return 0
    except KeyboardInterrupt:
        log("received interrupt; stopping dev servers")
        os.killpg(process.pid, signal.SIGTERM)
        return 130
    except BaseException:
        if process.poll() is None:
            os.killpg(process.pid, signal.SIGTERM)
        raise


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Bounce the local CTO dashboard.")
    parser.add_argument("--skip-install", action="store_true", help="Skip npm install.")
    parser.add_argument("--skip-clean", action="store_true", help="Keep generated dist/cache files.")
    parser.add_argument("--skip-docker", action="store_true", help="Do not restart the Postgres container.")
    parser.add_argument("--skip-build", action="store_true", help="Skip the production build check.")
    parser.add_argument("--skip-port-cleanup", action="store_true", help="Do not stop listeners on app ports.")
    parser.add_argument("--no-open", action="store_true", help="Do not open the dashboard in the default browser.")
    parser.add_argument("--prepare-only", action="store_true", help="Prepare dependencies and database, then exit.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    require("npm")
    if not args.skip_docker:
        require("docker")

    log(f"app root: {APP_ROOT}")

    if not args.skip_clean:
        remove_generated_files()

    if not args.skip_install:
        run(["npm", "install"])

    if not args.skip_port_cleanup:
        free_app_ports()

    if not args.skip_docker:
        run(["docker", "compose", "down"], check=False)
        run(["docker", "compose", "up", "-d", "postgres"])
        wait_for_port("localhost", DB_PORT, 60)
        run(["docker", "compose", "exec", "-T", "postgres", "pg_isready", "-U", "cto", "-d", "cto_dashboard"])

    if not args.skip_build:
        run(["npm", "run", "build"])

    if args.prepare_only:
        log("prepared successfully; dev server not started")
        return 0

    return start_dev_server(open_browser=not args.no_open)


if __name__ == "__main__":
    raise SystemExit(main())

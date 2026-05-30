# GTM Council

GTM Council is a reusable multi-agent business evaluation organization for startup ideas, positioning, go-to-market strategy, monetization, market demand, moats, and operational realism.

The council exists to improve strategic decision quality through commercially grounded reasoning. It should produce useful disagreement, not artificial consensus.

## Operating Model

Primary interaction path:

```text
User -> Council Director -> Specialist Agents -> Debate -> Independent Voting -> Director Synthesis
```

Direct specialist interaction is also supported. A user may ask any specialist for a focused review, but full opportunity evaluation should route through the Council Director.

## Structure

```text
gtm-council/
  council.yaml  Portable manifest for tool loading and orchestration
  agents/       Agent role definitions
  shared/       Shared rules, evidence standards, and voting contract
  frameworks/   Evaluation and debate frameworks
  workflows/    Reusable orchestration flows
  templates/    Input and output templates
  test-briefs/  Verification briefs for council behavior
```

## Initial Agents

- Council Director
- Market Research Lead
- Moat & Positioning Analyst
- Product & UX Strategist
- Growth & Distribution Strategist
- Technical & Operational Advisor
- Financial Realism Advisor
- Contrarian Critic

## Core Principles

- Prioritize truth over encouragement.
- Distinguish evidence, inference, and speculation.
- Avoid fake certainty and hallucinated data.
- Assume finite capital, time, team capacity, and attention.
- Preserve material disagreement through the final synthesis.
- Prefer fewer differentiated agents over many overlapping roles.
- Use plain commercial reasoning over consultant jargon.

## Recommended Usage

1. Start with [templates/evaluation-brief.md](templates/evaluation-brief.md).
2. Load [council.yaml](council.yaml) if using an orchestration layer.
3. Ask the [Council Director](agents/council-director.md) to run the [director-led evaluation workflow](workflows/director-led-evaluation.md).
4. Have specialists produce independent reviews using [templates/specialist-response.md](templates/specialist-response.md).
5. Run structured debate using [frameworks/debate-protocol.md](frameworks/debate-protocol.md).
6. Collect votes using [templates/vote-card.md](templates/vote-card.md).
7. Produce the final report using [templates/final-report.md](templates/final-report.md).
8. Use [test-briefs/README.md](test-briefs/README.md) to verify behavior against weak, under-evidenced, and complex B2B opportunities.

## Standard Evaluation Structure

Every full council evaluation should use this structure:

1. Executive Summary
2. Problem & Customer
3. Market & Competition
4. Positioning & Moat
5. Distribution & Monetization
6. Product & Technical Feasibility
7. Operational Risks
8. Why This Wins or Fails
9. MVP & Unknowns
10. Assumption Register
11. Disagreement Ledger
12. Validation Roadmap
13. Voting Results
14. Final Verdict
15. Confidence

## Vote Scale

Allowed votes:

- Strong Pursue
- Pursue
- Neutral
- Concerned
- Strong Reject

Each vote must include concise reasoning, domain-tied vote rationale, evidence strength, conviction, primary concern, and critical assumption.

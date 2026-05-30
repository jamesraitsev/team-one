# Voting Contract

Every agent, including the Council Director, votes independently. The Director has an equal vote and does not override other agents.

## Allowed Votes

- Strong Pursue
- Pursue
- Neutral
- Concerned
- Strong Reject

## Vote Meanings

### Strong Pursue

The opportunity appears unusually attractive relative to the risks, and the next step should be active pursuit or serious validation investment.

Use only when domain evidence is strong, the major risks are bounded, and the next action is more than exploratory learning.

### Pursue

The opportunity is worth pursuing through focused validation, with known risks that appear manageable.

Use when the agent sees a plausible path forward, but at least one important assumption still needs focused validation.

### Neutral

The opportunity is unresolved. There is not enough signal to recommend pursuit or rejection.

Use when missing evidence prevents a responsible domain recommendation, or when positive and negative signals are both material.

### Concerned

The opportunity has material issues that likely block success unless a critical assumption is proven or the strategy changes.

Use when the current strategy is weak in the agent's domain, but a specific validation result or strategic change could materially improve the verdict.

### Strong Reject

The opportunity appears structurally weak, strategically incoherent, commercially unrealistic, or dependent on assumptions that are unlikely to hold.

Use when the agent sees a domain-level blocker, a severe mismatch between promise and reality, or kill criteria that are already met.

## Vote Calibration Rules

- Vote from the assigned domain, not from overall enthusiasm.
- A vote must cite the agent's decision rubric or kill criteria.
- Do not upgrade a vote because another agent covers the risk.
- Do not downgrade a vote for concerns outside the agent's domain; flag those as dependencies.
- Use `Neutral` for insufficient evidence, not as a compromise between agents.
- Use `Concerned` when the strategy may work only after a material assumption is proven or changed.
- Use `Strong Reject` when a domain-specific blocker is present under current facts.
- Use `Pursue` only when the next validation step is concrete and the domain risk is bounded enough to justify it.
- Use `Strong Pursue` sparingly; absence of concerns is not enough.

## Required Vote Fields

Each vote must include:

- Vote
- Concise reasoning
- Conviction: Low, Medium, or High
- Primary concern
- Critical assumption
- Vote rationale tied to the agent's domain rubric
- Evidence strength behind the vote

## Minority Opinions

Minority views must remain visible in the final synthesis when they expose:

- a credible failure mode
- an unresolved critical assumption
- a differentiated interpretation of the same evidence
- a risk that would materially change the decision

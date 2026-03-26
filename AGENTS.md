# AGENTS.md

## Project Identity

This project is a calm, mindfulness-centered community product for the AI era.

Its purpose is to help users stay clear-minded and internally grounded amid AI anxiety, career uncertainty, information overload, and inner instability.

This is not a generic forum and not a productivity tool.

It combines:

- Community
- Mindfulness Practice
- Journal
- Check-in

---

## Source of Truth

Before making any changes, read these files in order:

1. `README.md`
2. `PROJECT_CONTEXT.md`
3. `ROADMAP.md`
4. relevant files under `docs/` if they exist

Important:

- `README.zh.md` is the founder-facing primary Chinese document
- `README.md` is the English execution document for AI agents
- if there is any mismatch, preserve code behavior according to `README.md` and flag the inconsistency clearly

---

## Current Product Scope

Current stage: MVP

The MVP includes:

- anonymous-friendly community posting
- comments
- breathing practice
- meditation timer
- audio meditation
- mindfulness journal
- daily check-in
- streak tracking
- basic user system

The MVP does NOT include:

- recommendation algorithms
- direct messaging
- following / social graph
- complex gamification
- AI-generated user content
- AI posting or commenting on behalf of users
- AI replacing user reflection

Do not add features outside this scope unless explicitly requested.

---

## Product Principles

When making product or UI decisions, follow these principles:

- calm over stimulation
- clarity over cleverness
- depth over speed
- reflection over reaction
- human agency over automation

The product should feel:

- calm
- minimal
- spacious
- quiet
- grounded

Avoid:

- noisy layouts
- bright or aggressive visual choices
- addictive engagement mechanics
- unnecessary feature expansion

---

## AI Principles

AI is allowed only as an assistant.

AI must not:

- generate user journal entries
- post on behalf of users
- comment on behalf of users
- replace user thinking or reflection
- automatically trigger “reflection” content without user intent

AI may:

- assist understanding
- summarize optional content
- support navigation or lightweight interpretation
- help organize information when explicitly requested

All AI-like behavior must be optional, never forced.

---

## Engineering Principles

When editing this project:

- keep code readable and modular
- prefer simple implementations
- avoid unnecessary abstractions
- avoid introducing heavy dependencies unless clearly justified
- preserve consistent naming and structure
- optimize for long-term maintainability and AI readability

Prefer code that a new engineer or coding agent can understand quickly.

---

## Architecture Preferences

Use domain-based organization where possible.

Preferred conceptual modules:

- `community`
- `practice`
- `journal`
- `checkin`
- `profile` or `user`

Keep shared code separate from domain code.

Suggested organization pattern:

- route files under `src/app/...`
- domain logic under `src/features/...`
- shared UI under `src/components/...`
- common utilities under `src/lib/...`

Do not scatter one feature across many unrelated places unless the framework requires it.

---

## Naming Conventions

Use stable product vocabulary.

Preferred terms:

- Community
- Practice
- Journal
- Check-in
- Streak
- Anonymous Post

Avoid mixing multiple names for the same concept.

For example:

- use `check-in`, not sometimes `checkin`, `daily sign-in`, or `habit log`
- use `journal`, not sometimes `diary` or `logbook`
- use `practice`, not sometimes `toolbox` or `meditation area`

Code naming should stay consistent with product naming.

---

## UI Expectations

UI should be:

- clean
- minimal
- calm
- mobile-friendly
- easy to scan

Prefer:

- generous spacing
- simple typography hierarchy
- neutral palette
- low visual noise
- straightforward interaction patterns

Do not introduce:

- flashy animations without reason
- attention traps
- cluttered dashboards
- “growth hack” style engagement widgets

If a UI choice conflicts with calmness, choose calmness.

---

## Development Behavior

When implementing a task:

1. Read the relevant context files first
2. Understand the current phase and scope
3. Make the smallest coherent change that solves the task
4. Keep edits localized when possible
5. Update docs if behavior or scope changes
6. Explain assumptions if anything is ambiguous

Do not silently redesign the product while implementing a local feature.

---

## Documentation Behavior

If you change functionality, also consider whether these files need updates:

- `README.md`
- `PROJECT_CONTEXT.md`
- `ROADMAP.md`
- `docs/database-schema.md`
- other relevant docs

If documentation is missing but needed for clarity, add concise documentation rather than leaving hidden assumptions in code.

---

## Task Boundaries

Unless explicitly requested, do not:

- refactor unrelated modules
- rename large parts of the codebase
- add backend services beyond the agreed stack
- add analytics, notifications, or recommendation systems
- invent product features not documented in scope

Stay within the requested task.

---

## Preferred Output Style for Code Changes

When proposing or making code changes:

- keep implementations compact and readable
- use descriptive names
- include comments only where they add real clarity
- avoid overengineering
- avoid placeholder complexity for future hypothetical features

Prefer “clear now” over “abstract maybe later”.

---

## Testing and Validation

Before finishing a task, verify as much as practical:

- code builds
- affected flows still work
- no obvious type or lint issues
- new UI matches the calm product direction

If something could not be verified, say so explicitly.

---

## If Context Is Incomplete

If the requested task conflicts with the documented project direction:

- do not guess silently
- follow the documented scope
- note the conflict clearly in your response

If a feature seems useful but is outside scope, mention it separately instead of implementing it.

---

## Agent Goal

Your goal is not to maximize features.

Your goal is to help build a product that is:

- understandable
- coherent
- calm
- aligned with its philosophy
- easy for future humans and AI agents to continue developing
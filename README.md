# Mindhub

Mindhub is a calm and minimal product that helps people stay clear-minded and internally grounded in the AI era.

It is not a generic forum. The long-term product has four modules:

- Community
- Practice
- Journal
- Check-in

## Current Scope

The project is in MVP, and current implementation is limited to **Phase 1: Community**.

Implemented:

- Supabase email magic-link login
- nickname editing
- post creation
- post detail page
- comments

Not implemented yet:

- Practice
- Journal
- Check-in
- streak logic

## Product Boundaries

Do not introduce:

- recommendation algorithms
- addictive engagement mechanics
- social graph features
- notification-heavy behavior
- AI-generated user expression
- unnecessary complexity

## Documentation Layers

Top-level docs (`D:\Mindhub`) describe product context and collaboration:

- [README.zh.md](/D:/Mindhub/README.zh.md): main Chinese product brief
- [PROJECT_CONTEXT.md](/D:/Mindhub/PROJECT_CONTEXT.md): product identity and principles
- [ROADMAP.md](/D:/Mindhub/ROADMAP.md): phase boundaries and scope
- [AGENTS.md](/D:/Mindhub/AGENTS.md): top-level collaboration rules

App-level docs (`D:\Mindhub\app`) describe implementation and runtime:

- [README.md](/D:/Mindhub/app/README.md): setup and run entry
- [AGENTS.md](/D:/Mindhub/app/AGENTS.md): Next.js 16 technical constraints

## Development Entry

The actual git repository and runnable Next.js app are in [app](/D:/Mindhub/app).

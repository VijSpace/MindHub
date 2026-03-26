# Mindhub App

This is the actual git repository and Next.js application for Mindhub.

For product context and scope boundaries, read first:

- [README.zh.md](/D:/Mindhub/README.zh.md)
- [PROJECT_CONTEXT.md](/D:/Mindhub/PROJECT_CONTEXT.md)
- [ROADMAP.md](/D:/Mindhub/ROADMAP.md)
- [AGENTS.md](/D:/Mindhub/AGENTS.md)

For app-level coding constraints, read:

- [AGENTS.md](/D:/Mindhub/app/AGENTS.md)

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 
- Supabase

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env template:

```bash
copy .env.example .env.local
```

3. Fill required variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Run [schema.sql](/D:/Mindhub/app/db/schema.sql) in Supabase SQL editor.

## Run Commands

- `npm run dev`: start local development server
- `npm run build`: production build
- `npm run start`: start production server

## Current Product Scope in App

Only Community MVP is in active implementation:

- auth (magic link)
- nickname
- posts
- anonymous posting
- comments

Do not start formal Practice / Journal / Check-in implementation in this phase.

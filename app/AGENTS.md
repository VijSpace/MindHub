# App Collaboration Rules (Next.js 16)

This file defines code-level constraints for `D:\Mindhub\app`.

## Must Read Before Coding

1. `D:\Mindhub\README.zh.md`
2. `D:\Mindhub\PROJECT_CONTEXT.md`
3. `D:\Mindhub\ROADMAP.md`
4. Relevant docs under `D:\Mindhub\app\node_modules\next\dist\docs\`

## Next.js 16 Constraints

- Use App Router conventions.
- Server Components are default; use Client Components only when state/effects/browser APIs are required.
- Keep server/client boundaries explicit with `"use client"` only where needed.
- Follow current APIs from local Next.js docs; do not rely on outdated patterns.

## Scope and Product Constraints

- Keep implementation within Community MVP.
- Do not start formal Practice / Journal / Check-in features.
- Keep the UI calm, minimal, and readable.
- Avoid unnecessary complexity and growth mechanics.

## Supabase Usage

- Reuse stable Supabase client instances on the browser side.
- Avoid creating repeated auth listeners or duplicate browser clients in render/effect loops.

## Editing Safety

- Do not revert user-owned local changes unless explicitly requested.
- Apply minimal, targeted fixes for the current issue.
- Do not introduce new dependencies unless absolutely necessary.

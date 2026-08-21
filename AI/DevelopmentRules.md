# Development Rules for AI Agents

When working on this codebase, you MUST follow these strict rules:

1. **NO TypeScript**: The project must use plain JavaScript (`.js`/`.jsx`). Convert any Figma-generated TypeScript to JavaScript.
2. **Do Not Rewrite Working UI Unnecessarily**: Only refactor file structure to React Router and separate components. The visual styling and Tailwind classes should remain as generated unless there's a functional bug.
3. **Strict RBAC Enforcement**: Never trust the frontend. If an API modifies data, verify the user making the request owns the data.
4. **Backend Validation**: Use Zod for all incoming request bodies, queries, and params. Return standardized error responses.
5. **Database Access**: Use Drizzle ORM exclusively. Do not write raw SQL strings.
6. **Financial Safety**: Any modification to `wallet_balance` must happen within a database transaction alongside `wallet_transactions` ledger insertion.
7. **Business Logic Location**: Keep controllers thin (parse request, send response). Put business logic inside a Service layer.
8. **Dependencies**: Justify any new `npm` package before adding it. Avoid bloat.
9. **Secrets**: Do not hardcode secrets or DB credentials anywhere in the code.
10. **Phased Execution**: Implement the project according to `Phases.md`. Do not build Phase 10 before Phase 2.
11. **Check Existing Code**: Before creating a new UI component, check if one already exists in `src/UI.jsx`.
12. **No Future Creep**: Do not implement features not explicitly defined in the PRD (like subscriptions or bidding).

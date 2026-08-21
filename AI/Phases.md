# Implementation Phases

The development MUST happen in phases to ensure modularity, independent testability, and stability.

## Phase 0: Codebase Analysis and Architecture
- **Objective**: Establish AI specs and understand Figma UI.
- **Status**: Completed via `/AI` folder generation.

## Phase 1: Frontend Refactoring and JavaScript Migration
- **Objective**: Convert `.tsx`/`.ts` files to `.jsx`/`.js`. Remove TypeScript. Setup React Router.
- **Files**: `src/*`
- **Acceptance Criteria**: App runs cleanly on Vite without TS errors, routing uses React Router.

## Phase 2: Project/Backend Foundation
- **Objective**: Setup Express.js server, basic folder structure, config, and error handling middleware.
- **Dependencies**: `express`, `cors`, `dotenv`, `zod`.

## Phase 3: Database + Drizzle Schema
- **Objective**: Setup PostgreSQL connection, write Drizzle schemas (`schema.js`), and run initial migrations.
- **Dependencies**: `pg`, `drizzle-orm`, `drizzle-kit`.

## Phase 4: Authentication + RBAC
- **Objective**: Implement Auth API (register, login, OTP mock). JWT integration. RBAC middlewares.
- **APIs**: `POST /auth/register`, `POST /auth/login`.

## Phase 5: Farmer Onboarding/Profile
- **Objective**: APIs for updating farmer profiles.
- **APIs**: `PUT /farmer/profile`, `GET /farmer/profile`.

## Phase 6: Farmer Produce Management
- **Objective**: CRUD operations for vegetables.
- **APIs**: `POST /produce`, `PUT /produce/:id`, `DELETE /produce/:id`, `GET /farmer/:id/produce`.

## Phase 7: Consumer Marketplace
- **Objective**: Fetching farmers, filtering by type, searching vegetables.
- **APIs**: `GET /farmers`, `GET /search`.

## Phase 8: Cart + Checkout
- **Objective**: Backend validation for cart items and checkout flow.
- **APIs**: Cart can be local, but `POST /orders` handles checkout.

## Phase 9: Order Management
- **Objective**: Farmer order dashboard, order state machine.
- **APIs**: `GET /farmer/orders`, `PATCH /orders/:id/status`.

## Phase 10: Farmer Wallet + 2% Fee
- **Objective**: Wallet recharge API, transaction ledger, and automatic 2% deduction logic on order completion.
- **APIs**: `GET /wallet`, `POST /wallet/recharge`.

## Phase 11: Rider Workflow
- **Objective**: Rider dashboard, assigning orders, completing deliveries.
- **APIs**: `GET /rider/requests`, `PATCH /rider/orders/:id/accept`, `PATCH /orders/:id/status`.

## Phase 12: Notifications/Status Synchronization
- **Objective**: Simple polling or SSE/WebSockets for order status updates on consumer/farmer ends.

## Phase 13: Frontend/Backend Integration
- **Objective**: Replace `data.ts` mock data with actual API calls using `fetch` or `axios`.

## Phase 14: Validation + Error Handling
- **Objective**: Ensure comprehensive Zod validation across all routes. Standardize error responses.

## Phase 15: Testing + Security
- **Objective**: Unit tests for Wallet deduction. RBAC bypass checks.

## Phase 16: Production Preparation
- **Objective**: Environment variables clean up, build optimization.

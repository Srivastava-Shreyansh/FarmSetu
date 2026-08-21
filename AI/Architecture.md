# Technical Architecture

## 1. System Overview
A modern, monolithic full-stack web application designed for the Farm-to-Consumer Marketplace MVP.

```text
React Client (Tailwind, Vite)
     |
     v (REST API over HTTPS)
     |
Express API (Node.js)
     |
     +---- Zod Validation Middleware
     |
     +---- Auth & RBAC Middleware (JWT based)
     |
     +---- Controllers (Req/Res parsing)
     |
     +---- Services (Business Logic Layer)
     |
     +---- Drizzle ORM (Data Access Layer)
     |
     v
PostgreSQL Database
```

## 2. Frontend Architecture
- **Framework**: React 19, Vite 8.
- **Styling**: Tailwind CSS v4.
- **State Management**: React Context / Hooks for MVP. (Consider Zustand/Redux if state gets complex).
- **Routing**: React Router (to replace current manual state-based routing).
- **Language**: JavaScript (migrating away from Figma-generated TypeScript).

## 3. Backend Architecture
- **Framework**: Node.js + Express.js.
- **Validation**: Zod for request body, query, and params.
- **Layered Design**:
  - `Routes`: Map HTTP methods to controllers.
  - `Middlewares`: Auth, RBAC, Validation, Error Handling.
  - `Controllers`: Handle request data and response formatting.
  - `Services`: Core business logic, transaction boundaries.

## 4. Database Architecture
- **RDBMS**: PostgreSQL.
- **ORM**: Drizzle ORM.
- Focus on strong referential integrity, appropriate indexing, and transaction-safe financial operations (Wallet).

## 5. Authentication & RBAC Architecture
- **Auth**: JWT (JSON Web Tokens) or secure session cookies.
- **Passwords**: Hashed using bcrypt or argon2.
- **RBAC**: Middleware to enforce role-based access (`isFarmer`, `isConsumer`, `isRider`).

## 6. Order Lifecycle & Wallet Architecture
- Orders act as the central entity bridging all roles.
- Wallet transactions are strictly ACID-compliant. The 2% fee deduction must be done within a DB transaction when the order is marked `delivered`.

## 7. File/Image Upload Strategy
- **Initial**: Store image URLs (Unsplash placeholders as used in Figma).
- **Future**: AWS S3 or Cloudinary integration for user-uploaded profile and farm images.

## 8. Security Architecture
- CORS configured for frontend domain.
- Rate limiting on API endpoints (especially Auth and Wallet).
- SQL Injection protected via Drizzle ORM.

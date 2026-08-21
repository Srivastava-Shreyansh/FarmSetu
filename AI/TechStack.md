# Technology Stack

## Frontend
- **Framework**: React 19 (Provides robust UI component architecture).
- **Build Tool**: Vite 8 (Fast dev server, optimized builds).
- **Styling**: Tailwind CSS v4 (Utility-first, efficient styling matching Figma).
- **Language**: JavaScript (ES6+). Migrating from Figma-generated TypeScript to pure JS as requested.
- **Icons**: `lucide-react`.

## Backend
- **Environment**: Node.js.
- **Framework**: Express.js (Lightweight, well-supported).
- **Language**: JavaScript (Consistency with frontend).

## Database & ORM
- **Database**: PostgreSQL (Relational consistency required for orders and wallets).
- **ORM**: Drizzle ORM (Type-safe, fast, clean SQL generation without the bloat of Prisma/TypeORM).

## Validation
- **Library**: Zod (Powerful schema validation for APIs and configs).

## Authentication & Security
- **Auth Strategy**: JWT (JSON Web Tokens) or Secure HttpOnly Cookies for stateless auth.
- **Password Hashing**: `bcryptjs` or `argon2`.
- **CORS**: `cors` middleware for Express.
- **Security Headers**: `helmet`.

## Development Tooling
- **Linting/Formatting**: `oxfmt`, `eslint`.
- **Environment Variables**: `dotenv`.
- **API Testing**: Postman / Thunder Client / cURL.

## Excluded Technologies
- MongoDB, Prisma, Sequelize, TypeORM.
- TypeScript (to be removed from frontend as per specification).

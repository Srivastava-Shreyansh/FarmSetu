# Security Architecture

## 1. Authentication
- Use JWT (JSON Web Tokens) with a short expiry (e.g., 1 hour) and refresh token strategy, or secure HttpOnly/Secure/SameSite cookies.
- Do NOT store JWTs in `localStorage` if possible (use HttpOnly cookies to prevent XSS).

## 2. Password & Data Security
- Passwords must be hashed using `bcryptjs` or `argon2`. Never store plain text.
- Environment variables (`.env`) for secrets (JWT Secret, DB connection string) must never be checked into version control.

## 3. Input Validation & SQL Injection
- Drizzle ORM provides protection against SQL injection via parameterized queries. Do not use raw string concatenation in SQL queries.
- Zod ensures all API inputs are of expected type, preventing NoSQL/SQL injection via crafted JSON payloads.

## 4. Authorization (RBAC)
- Middleware must check the JWT role before allowing access to route controllers.
- Ownership checks must happen inside the controller/service (`resource.user_id === req.user.id`). Do not trust the frontend to hide UI elements; the backend must explicitly reject unauthorized requests.

## 5. Network & Abuse
- Use `helmet` for HTTP headers.
- Implement rate-limiting (`express-rate-limit`) on sensitive endpoints like `/auth/send-otp`, `/auth/login`, and `/wallet/recharge`.

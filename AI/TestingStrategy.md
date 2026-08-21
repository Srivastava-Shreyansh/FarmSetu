# Testing Strategy

## 1. Unit Testing
- Test utility functions, complex validation logic, and isolated services.
- Test Wallet Deduction logic thoroughly. Mock the DB transaction and ensure the math and ledger entries match correctly.

## 2. API / Integration Testing
- Use tools like `supertest` or `jest` to test Express routes.
- **Critical Tests**:
  - **RBAC**: Attempt to access farmer routes as a consumer (expect 403).
  - **Ownership**: Attempt to modify farmer B's produce using farmer A's token (expect 403).
  - **Order Lifecycle**: Attempt to transition an order from `placed` directly to `delivered` (expect 409 Invalid State Transition).
  - **Wallet**: Verify exactly 2% is deducted upon order completion, and verify balance decreases exactly by 2%.

## 3. Database Constraints Testing
- Insert order with items belonging to multiple farmers (expect DB level fail if constraint exists, or backend validation fail).
- Verify foreign keys properly cascade or restrict deletion (e.g., cannot hard delete a farmer if orders exist).

## 4. Frontend Testing (Later Phase)
- React Testing Library to ensure correct components render based on role context.
- Ensure API mocks in UI reflect the API.md specifications.

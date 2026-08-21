# Business Rules

## Farmer Rules
- **Farmer Type**: Must be classified strictly as `PRODUCER` or `LOCAL_VENDOR`. This helps consumers filter.
- **Produce Ownership**: A farmer can only manipulate produce entries linked to their `farmer_id`.
- **Produce Availability**: If a vegetable is marked unavailable or soft-deleted, consumers cannot add it to cart or place an order containing it.

## Consumer Rules
- **Cart**: Cart items must track the `produce_id` and the `farmer_id`.
- **Quantity**: UI restricts additions to 0.5kg intervals. Backend should validate `quantity >= 0.5` and `quantity % 0.5 == 0` (or allow reasonable floats but enforce min 0.5).
- **Order Creation**: All items in a single order must belong to the **same farmer**. If a consumer wants items from multiple farmers, they must place separate orders.

## Orders
- **Status Transitions**: Strictly enforced sequence. (See OrderLifecycle.md)
- **Completion**: Once an order reaches `delivered`, it is final.

## Wallet & Platform Fee
- **2% Deduction**: Exactly when an order status changes to `delivered` (or when the platform considers the sale final), 2% of the `total_amount` is deducted from the `farmer_profiles.wallet_balance`.
- **Insufficient Balance**: If a farmer's wallet balance drops below a threshold (e.g., ₹0), they should be prevented from accepting new orders until they recharge. (MVP: Just show warning in UI, but business rule should ideally block).
- **Atomicity**: The 2% deduction MUST be a database transaction:
  1. Record `wallet_transactions` entry (type: deduction).
  2. Decrement `wallet_balance` on `farmer_profiles`.
  3. (Optional) Record platform revenue.
  All must succeed or fail together.

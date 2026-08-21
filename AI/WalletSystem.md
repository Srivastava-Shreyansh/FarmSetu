# Wallet System

## 1. Overview
The farmer wallet is an internal ledger. It does NOT hold consumer funds (consumers pay via external payment gateways or COD, which is outside the MVP wallet scope). The farmer wallet is specifically for managing the **Platform Fee (2%)**.

## 2. Platform Fee Business Rule
For every completed order, the platform takes a 2% cut of the `total_amount`.
To ensure the platform gets paid (especially if consumer pays COD or via direct UPI to the farmer), the platform deducts this 2% from the farmer's pre-funded wallet.

## 3. Database Operations (Transaction Safety)
Deductions MUST use PostgreSQL Transactions to prevent race conditions.

**Pseudo-code for Deduction (inside `delivered` transition):**
```javascript
db.transaction(async (tx) => {
  // 1. Mark order delivered
  await tx.update(orders).set({ status: 'delivered' }).where({ id: orderId });

  // 2. Calculate fee
  const order = await tx.select().from(orders).where({ id: orderId }).first();
  const fee = order.total_amount * 0.02;

  // 3. Deduct balance (safe update using DB level math, avoiding read-modify-write races in Node)
  // UPDATE farmer_profiles SET wallet_balance = wallet_balance - fee WHERE id = ... RETURNING wallet_balance
  const updatedProfile = await tx.update(farmer_profiles)
    .set({ walletBalance: sql`${farmer_profiles.walletBalance} - ${fee}` })
    .where({ id: order.farmer_id })
    .returning();

  // 4. Create ledger entry
  await tx.insert(wallet_transactions).values({
    farmer_id: order.farmer_id,
    type: 'deduction',
    amount: -fee,
    order_id: order.id,
    description: `Platform Fee — Order #${order.id}`,
    balance_after: updatedProfile.wallet_balance
  });
});
```

## 4. Wallet Recharge
Farmers use external gateways to recharge.
Upon success webhook/callback:
1. `UPDATE farmer_profiles SET wallet_balance = wallet_balance + amount`
2. `INSERT INTO wallet_transactions (type='recharge')`
(Both in a transaction).

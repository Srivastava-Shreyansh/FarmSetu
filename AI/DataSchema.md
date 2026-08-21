# Database Schema (Drizzle / PostgreSQL)

## 1. Overview
The schema uses strong relational mapping.

## 2. Entities

### `users`
- `id`: UUID (PK)
- `mobile`: VARCHAR(15) (Unique)
- `password_hash`: VARCHAR
- `role`: ENUM ('farmer', 'consumer', 'rider')
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### `farmer_profiles`
- `id`: UUID (PK, FK -> users.id)
- `name`: VARCHAR
- `type`: ENUM ('PRODUCER', 'LOCAL_VENDOR')
- `location`: VARCHAR
- `address`: TEXT
- `image`: VARCHAR
- `farm_image`: VARCHAR
- `rating`: DECIMAL(3,2)
- `review_count`: INT
- `delivery_time`: VARCHAR
- `tagline`: VARCHAR
- `wallet_balance`: DECIMAL(10,2)

### `consumer_profiles`
- `id`: UUID (PK, FK -> users.id)
- `name`: VARCHAR
- `address`: TEXT

### `rider_profiles`
- `id`: UUID (PK, FK -> users.id)
- `name`: VARCHAR
- `status`: ENUM ('available', 'busy', 'offline')

### `produce` (Vegetables)
- `id`: UUID (PK)
- `farmer_id`: UUID (FK -> farmer_profiles.id)
- `name`: VARCHAR
- `description`: TEXT
- `price_per_kg`: DECIMAL(10,2)
- `image`: VARCHAR
- `available`: BOOLEAN (Default: true)
- `created_at`: TIMESTAMP

### `orders`
- `id`: UUID (PK)
- `consumer_id`: UUID (FK -> consumer_profiles.id)
- `farmer_id`: UUID (FK -> farmer_profiles.id)
- `rider_id`: UUID (FK -> rider_profiles.id, Nullable)
- `status`: ENUM ('placed', 'confirmed', 'preparing', 'ready', 'rider_assigned', 'picked_up', 'out_for_delivery', 'delivered')
- `total_amount`: DECIMAL(10,2)
- `platform_fee`: DECIMAL(10,2) (Calculated as 2% of total)
- `placed_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### `order_items`
- `id`: UUID (PK)
- `order_id`: UUID (FK -> orders.id)
- `produce_id`: UUID (FK -> produce.id)
- `quantity`: DECIMAL(10,2)
- `price_per_kg`: DECIMAL(10,2)

### `wallet_transactions`
- `id`: UUID (PK)
- `farmer_id`: UUID (FK -> farmer_profiles.id)
- `type`: ENUM ('recharge', 'deduction')
- `amount`: DECIMAL(10,2)
- `order_id`: UUID (FK -> orders.id, Nullable)
- `description`: VARCHAR
- `balance_after`: DECIMAL(10,2)
- `created_at`: TIMESTAMP

## 3. Relationships
- User 1:1 FarmerProfile / ConsumerProfile / RiderProfile
- Farmer 1:N Produce
- Consumer 1:N Orders
- Farmer 1:N Orders
- Rider 1:N Orders
- Order 1:N OrderItems
- Farmer 1:N WalletTransactions

## 4. Invariants
- `wallet_balance` must equal sum of `wallet_transactions` amounts.
- `platform_fee` must be strictly 2% of `total_amount`.
- Soft delete should be considered for `produce` instead of hard delete to keep order history intact.

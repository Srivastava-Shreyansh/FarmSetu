# API Specifications

## Auth
- `POST /api/auth/send-otp` - Sends OTP. (Mocked in MVP).
- `POST /api/auth/login` - Verifies OTP and returns JWT.

## Profile
- `GET /api/profile` - Get logged-in user profile. (Auth required)
- `PUT /api/profile/farmer` - Update Farmer specific details (Role: FARMER)

## Marketplace (Consumer/Public)
- `GET /api/farmers` - Query `?type=Producer|Local Vendor`. Returns farmers list.
- `GET /api/farmers/:id` - Get farmer details and their available produce.
- `GET /api/search` - Query `?q=text`. Returns matching vegetables/farmers.

## Produce (Farmer)
- `POST /api/produce` - Add new vegetable. (Role: FARMER)
- `PUT /api/produce/:id` - Edit vegetable details. (Role: FARMER)
- `PATCH /api/produce/:id/availability` - Toggle availability. (Role: FARMER)
- `DELETE /api/produce/:id` - Soft delete produce. (Role: FARMER)

## Orders
- `POST /api/orders` - Consumer creates an order. (Role: CONSUMER)
- `GET /api/orders` - Get orders for the logged-in user (Farmer/Consumer/Rider).
- `GET /api/orders/:id` - Get order details.
- `PATCH /api/orders/:id/status` - Update status. (Depends on current status and Role - see OrderLifecycle.md)

## Rider
- `GET /api/rider/requests` - Get orders with status `ready`. (Role: RIDER)
- `PATCH /api/rider/orders/:id/accept` - Accept a pickup. Updates status to `rider_assigned`. (Role: RIDER)

## Wallet (Farmer)
- `GET /api/wallet` - Get balance and transaction history. (Role: FARMER)
- `POST /api/wallet/recharge` - Recharge wallet. (Role: FARMER)

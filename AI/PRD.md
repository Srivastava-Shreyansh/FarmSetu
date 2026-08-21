# Product Requirements Document (PRD)

## 1. Product Overview
The product is a farm-to-consumer vegetable marketplace connecting farmers directly with consumers and riders. It cuts out middlemen, allowing farmers to earn fair prices for their produce and consumers to access fresh vegetables at competitive prices. Riders facilitate the last-mile delivery.

## 2. Problem
Indian farmers often sell produce through mandis/intermediaries at low prices, while final consumers pay significantly more. The platform aims to bridge this gap by facilitating direct transactions.

## 3. Target Users & User Roles
1. **FARMER**: Individuals who grow produce (PRODUCER) or source and sell locally (LOCAL VENDOR).
2. **CONSUMER**: Buyers looking for fresh produce from local sources.
3. **RIDER**: Independent delivery personnel handling pickup and drop-off.

## 4. Core Value Proposition
- **Farmers**: Better margins, direct access to market, simple order and wallet management.
- **Consumers**: Fresh, traceable produce, competitive pricing, direct-to-home delivery.
- **Riders**: Flexible earnings per delivery.

## 5. Goals
- Provide a smooth onboarding for all roles.
- Facilitate an end-to-end order flow from browsing to delivery.
- Implement a robust wallet system for farmers for platform fee deduction.

## 6. Non-Goals
- B2B bulk ordering (initially).
- Subscriptions/recurring orders in the MVP.
- Complex bidding or auction models.

## 7. Core Features
### Farmer Requirements
- Profile creation (Name, Mobile, Location, Type: Producer/Local Vendor).
- Add/Edit/Hide produce listings (Name, Price, Availability).
- Manage incoming orders (Accept, Start Preparing, Mark Ready, Ping Rider).
- Manage wallet (Recharge, View Transactions, Automated 2% deduction).

### Consumer Requirements
- Browse farmers and local vendors.
- Search for specific vegetables.
- Add items to cart (quantity adjustments in 0.5kg steps).
- Place orders and track order status.
- View order history.

### Rider Requirements
- Receive pickup requests.
- Accept deliveries.
- Track delivery steps (Going to Farmer, Picked Up, Going to Consumer, Delivered).
- Track earnings.

## 8. Important Business Rules
- **Platform Fee**: A 2% fee is deducted from the Farmer's wallet for every completed order.
- **Wallet Requirement**: Farmers must maintain a balance to receive and complete orders.

## 9. MVP Scope
- React-based frontend (refactored from Figma Make prototype).
- REST API powered by Express.
- PostgreSQL database using Drizzle ORM.
- Authentication and RBAC for the 3 core roles.
- Wallet ledger system.

## 10. Future Scope
- AI-based price recommendations for farmers.
- Automated routing optimization for riders.
- Consumer wallet and loyalty points.

## 11. Explicitly Excluded Features (for now)
- Admin Dashboard (unless required for system operations, but not part of MVP user flows).
- Multi-city or complex geographical zoning.

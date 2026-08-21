# UI Context Analysis

This documents the existing Figma UI flows and maps them to backend requirements.

## 1. Auth Flow (`Auth.tsx`)
- **Role Selection**: Consumer, Farmer, Rider.
- **Login**: Mobile + OTP.
- **Backend Requirement**: Users table, authentication mechanism, roles.

## 2. Consumer Flow (`Consumer.tsx`)
- **Home**: Banner, search bar, category filter, Producer/Vendor toggle, horizontal farmer list, popular vegetables.
  - *Backend*: GET farmers, GET produce (popular).
- **Search**: Auto-search vegetables and farmers.
  - *Backend*: Search API.
- **Farmer Detail**: Farmer cover image, details (location, rating), list of produce.
  - *Backend*: GET farmer by ID, GET produce by farmer ID.
- **Product Detail**: Image, price, out of stock badge, add to cart with quantity controls.
  - *Backend*: GET produce by ID.
- **Cart**: Subtotal, delivery fee calculation.
  - *Backend*: Cart logic is local, but checkout needs POST order API.

## 3. Farmer Flow (`Farmer.tsx`)
- **Dashboard**: Sales stats, wallet balance, active produce count, recent orders preview.
  - *Backend*: GET orders (filtered by date/status), GET wallet balance.
- **Orders**: Tabs (Active, Completed). Advance status buttons.
  - *Backend*: PATCH order status.
- **Produce**: Grid of vegetables. Add, Edit, Toggle Visibility, Delete.
  - *Backend*: CRUD Produce API.
- **Wallet**: Balance, Recharge modal, Transaction list.
  - *Backend*: GET wallet info, POST recharge, automated fee deductions.
- **Onboarding**: Name, Mobile, Type, Address form.
  - *Backend*: PUT farmer profile.

## 4. Rider Flow (`Rider.tsx`)
- **Dashboard**: Earnings stats, active delivery banner, Pickup requests list.
  - *Backend*: GET orders with `status === 'ready'`.
- **Active Delivery**: Stepper (Navigate to Farmer -> Picked Up -> En Route -> Delivered). Call/Navigate buttons.
  - *Backend*: PATCH order status for rider progression.

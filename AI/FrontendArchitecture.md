# Frontend Architecture Refactoring

## Current State
The Figma-generated UI currently uses a monolithic `App.tsx` that manages global state (role, page, cart, selected items) and conditionally renders `Auth`, `Consumer`, `Farmer`, and `Rider` components. It heavily uses TypeScript (`.tsx`, `types.ts`).

## Proposed Refactored Structure
Move away from state-based manual routing to React Router, and extract logical modules. Migrate to pure JavaScript.

```text
src/
├── api/             # Axios/fetch configurations and endpoints
├── assets/          # Images, SVGs
├── components/      # Reusable UI (Button, Card, Badge, Modal, etc. from UI.tsx)
├── constants/       # Enums, config variables
├── contexts/        # React Contexts (AuthContext, CartContext)
├── features/        # Feature-specific components
│   ├── auth/
│   ├── consumer/
│   ├── farmer/
│   └── rider/
├── hooks/           # Custom hooks (useCart, useAuth, useOrders)
├── layouts/         # Role-specific layouts (ConsumerLayout, FarmerLayout)
├── pages/           # Page components matching routes
│   ├── auth/        # Login, Onboarding
│   ├── consumer/    # Home, Search, Cart, ProductDetail
│   ├── farmer/      # Dashboard, Orders, Produce, Wallet
│   └── rider/       # Dashboard, ActiveDelivery
├── styles/          # index.css (Tailwind)
├── utils/           # Formatting, date helpers
├── App.jsx          # React Router setup
└── main.jsx         # Entry point
```

## Migration Steps (TS -> JS)
1. Rename all `.tsx`/`.ts` to `.jsx`/`.js`.
2. Remove `interface` and `type` declarations (from `types.ts`).
3. Remove generic typings (e.g., `useState<Role>`).
4. Rely on PropTypes (optional) or JSDoc for documentation if needed.
5. Rely heavily on Backend Zod validation to catch runtime data shape errors.

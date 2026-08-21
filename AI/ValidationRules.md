# Validation Rules

We strictly use **Zod** on the backend to validate incoming data.

## 1. Auth Validation
```javascript
const LoginSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Must be 10 digits"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  role: z.enum(['consumer', 'farmer', 'rider'])
});
```

## 2. Farmer Profile Validation
```javascript
const FarmerProfileSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['PRODUCER', 'LOCAL_VENDOR']),
  address: z.string().min(5),
  tagline: z.string().optional()
});
```

## 3. Produce Validation
```javascript
const ProduceSchema = z.object({
  name: z.string().min(2),
  price_per_kg: z.number().positive(),
  available: z.boolean(),
  description: z.string().optional()
});
```

## 4. Order Validation
```javascript
const OrderSchema = z.object({
  farmer_id: z.string().uuid(),
  items: z.array(z.object({
    produce_id: z.string().uuid(),
    quantity: z.number().multipleOf(0.5).min(0.5) // Ensures 0.5, 1.0, 1.5, etc.
  })).min(1)
});
```

## 5. Wallet Validation
```javascript
const RechargeSchema = z.object({
  amount: z.number().min(100, "Minimum recharge is ₹100")
});
```

## Principle
Backend validation is authoritative. Never trust the frontend. If a validation fails, return a 400 with the Zod formatted error.

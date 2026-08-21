# Order Lifecycle

## State Machine
The core entity tying the marketplace together is the Order. It flows through the following states strictly:

```mermaid
stateDiagram-v2
    [*] --> placed: Consumer Checkout
    placed --> confirmed: Farmer Accepts
    confirmed --> preparing: Farmer Starts Prep
    preparing --> ready: Farmer Marks Ready
    ready --> rider_assigned: Rider Accepts Request
    rider_assigned --> picked_up: Rider Collects
    picked_up --> out_for_delivery: Rider En Route
    out_for_delivery --> delivered: Rider Completes
    delivered --> [*]: (Triggers Wallet Deduction)
```

## Transition Permissions

| Current State      | Next State         | Action Trigger            | Required Role |
|--------------------|--------------------|---------------------------|---------------|
| `None`             | `placed`           | Place Order               | CONSUMER      |
| `placed`           | `confirmed`        | Accept Order              | FARMER        |
| `confirmed`        | `preparing`        | Start Preparing           | FARMER        |
| `preparing`        | `ready`            | Mark Ready (Ping Rider)   | FARMER        |
| `ready`            | `rider_assigned`   | Accept Pickup             | RIDER         |
| `rider_assigned`   | `picked_up`        | Confirm Pickup            | RIDER         |
| `picked_up`        | `out_for_delivery` | Start Delivery            | RIDER         |
| `out_for_delivery` | `delivered`        | Confirm Delivery          | RIDER         |

## Database Impact on Delivery
When state becomes `delivered`:
1. Order is marked closed.
2. 2% Platform Fee logic is triggered (WalletSystem).

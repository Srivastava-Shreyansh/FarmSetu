# Role-Based Access Control (RBAC)

## FARMER
- **Profile**: Can edit their own farmer profile details.
- **Produce**: Can add, edit, hide, and soft-delete their OWN produce only. Backend must verify `produce.farmer_id === req.user.id`.
- **Orders**: Can view orders assigned to them (`farmer_id === req.user.id`).
- **Order Actions**: Can update status of their orders from `placed` -> `confirmed` -> `preparing` -> `ready`.
- **Wallet**: Can view own wallet balance and transactions. Can recharge own wallet.

## CONSUMER
- **Profile**: Can manage own profile/address.
- **Marketplace**: Can browse all farmers and available produce.
- **Orders**: Can create orders. Can view their own orders (`consumer_id === req.user.id`).
- **Order Actions**: Can track orders. Cannot change status (except maybe cancellation if allowed before confirmation, MVP doesn't have it).

## RIDER
- **Profile**: Can manage own profile/status.
- **Orders**: Can view available pickup requests (`status === 'ready'`).
- **Order Actions**: Can accept a request (assigns `rider_id === req.user.id` and sets status `rider_assigned`). Can update status of ASSIGNED orders (`rider_assigned` -> `picked_up` -> `out_for_delivery` -> `delivered`).

## General Rules
- Users can NEVER access resources of other users by changing an ID parameter in the URL. Middlewares/Services MUST check ownership against `req.user.id`.
- No ADMIN role currently defined for the MVP user journeys.

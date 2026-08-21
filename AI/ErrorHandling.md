# Error Handling & API Responses

We standardize all Express backend controllers and error handling using three core utility classes/functions: `ApiResponse`, `ApiError`, and `asyncHandler`.

## 1. ApiResponse Utility

All successful API responses MUST be wrapped in the `ApiResponse` class before being sent to the client.

```javascript
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
export { ApiResponse };
```
**Usage in a Controller:**
`res.status(200).json(new ApiResponse(200, { user }, "Login successful"));`

## 2. ApiError Utility

All operational errors (validation, not found, forbidden, etc.) MUST be thrown using the `ApiError` class. The Express global error handler will catch these and format them.

```javascript
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went Wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
```

## 3. AsyncHandler Wrapper

To avoid repetitive `try/catch` blocks in Express controllers, wrap every async controller function in `asyncHandler`. It automatically catches rejected promises and passes them to the `next` function (which forwards to the global error handler).

```javascript
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
export { asyncHandler };
```
**Usage:**
```javascript
export const loginUser = asyncHandler(async (req, res) => {
  const user = await db.query...
  if (!user) throw new ApiError(404, "User not found");
  res.status(200).json(new ApiResponse(200, user));
});
```

## 4. Common Status Codes
- **400**: Bad Request (Validation failures, Zod errors passed into `errors` array of `ApiError`)
- **401**: Unauthorized
- **403**: Forbidden (Valid token, wrong role)
- **404**: Not Found
- **409**: Conflict (e.g., Invalid State Transition for Orders)
- **500**: Internal Server Error

# Captain API Documentation

This file provides details on the available endpoints to manage captain (driver) operations including registration, login, profile retrieval, and logout.

---

## 1. Captain Registration

**Endpoint:**  
`POST /captains/register`

**Description:**  
Registers a new captain in the system. The endpoint validates the input, hashes the password, creates a captain record, and returns a JWT token along with the captain data.

**Request Body:**  
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Field Requirements:**

- `fullname.firstname`: string, **required**, minimum 3 characters.
- `fullname.lastname`: string, **required**, minimum 3 characters.
- `email`: string, **required**, must be a valid email.
- `password`: string, **required**, minimum 6 characters.
- `vehicle.color`: string, **required**, minimum 3 characters.
- `vehicle.plate`: string, **required**, minimum 5 characters.
- `vehicle.capacity`: integer, **required**, minimum value of 1.
- `vehicle.vehicleType`: string, **required**, must be one of `"car"`, `"motorcycle"`, or `"auto"`.

**Success Response (201 Created):**

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Validation Error (400 Bad Request):**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## 2. Captain Login

**Endpoint:**  
`POST /captains/login`

**Description:**  
Authenticates a captain using email and password. Returns a JWT token and the captain data if the credentials are valid.

**Request Body:**  
```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

**Field Requirements:**

- `email`: string, **required**, must be a valid email.
- `password`: string, **required**, minimum 6 characters.

**Success Response (200 OK):**

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Authentication Error (401 Unauthorized):**

```json
{
  "message": "Invalid email or password"
}
```

---

## 3. Get Captain Profile

**Endpoint:**  
`GET /captains/profile`

**Description:**  
Retrieves the profile information of the authenticated captain. Requires a valid JWT token (provided via cookie or the `Authorization` header).

**Headers Example:**

- Cookie: `token=<JWT_TOKEN>`
- Or header: `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Authentication Error (401 Unauthorized):**

```json
{
  "message": "Authentication required"
}
```

---

## 4. Captain Logout

**Endpoint:**  
`GET /captains/logout`

**Description:**  
Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie.

**Headers Example:**

- Cookie: `token=<JWT_TOKEN>`
- Or header: `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**

```json
{
  "message": "Logged out Successfully"
}
```

**Authentication Error (401 Unauthorized):**

```json
{
  "message": "Authentication required"
}
```

---

## Additional Notes

- Make sure to provide a valid JWT token for endpoints that require authentication.
- Input validation errors will return details of the specific issues to help correct the data.

For further implementation details, please refer to the following files:
- [routes/captain.routes.js](../routes/captain.routes.js)
- [controllers/captain.controller.js](../controllers/captain.controller.js)
- [Services/captain.services.js](../Services/captain.services.js)
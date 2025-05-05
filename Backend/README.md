# User APIs Documentation

This document details the endpoints for user operations, including registration, login, profile retrieval, and logout.

---

## User Registration

- **Endpoint:** `POST /users/register`
- **Description:** Registers a new user in the system by validating inputs, hashing the password, storing user data, and returning a JWT token.
- **Request Body:**

  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

- **Field Requirements:**
  - `fullname.firstname`: string, required, minimum 3 characters.
  - `fullname.lastname`: string, optional, minimum 3 characters if provided.
  - `email`: string, required, must be a valid email.
  - `password`: string, required, minimum 3 characters.
- **Success Response (201 Created):**

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Validation Error (400 Bad Request):**

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

## User Login

- **Endpoint:** `POST /users/login`
- **Description:** Authenticates a user with email and password. Returns a JWT token and user details if credentials are valid.
- **Request Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

- **Field Requirements:**
  - `email`: string, required, must be a valid email.
  - `password`: string, required, minimum 6 characters.
- **Success Response (200 OK):**

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Validation Error (400 Bad Request):**

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

- **Authentication Error (401 Unauthorized):**

  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

---

## User Profile

- **Endpoint:** `GET /users/profile`
- **Description:** Retrieves the profile information for the authenticated user. Requires a valid JWT token (passed as a cookie or in the `Authorization` header).
- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>` or use cookies.
- **Success Response (200 OK):**

  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

- **Authentication Error (401 Unauthorized):**

  ```json
  {
    "message": "Authentication required"
  }
  ```

---

## User Logout

- **Endpoint:** `GET /users/logout`
- **Description:** Logs out the user by blacklisting the JWT token and clearing the authentication cookie.
- **Request Headers:**
  - `Authorization: Bearer <JWT_TOKEN>` or use cookies.
- **Success Response (200 OK):**

  ```json
  {
    "message": "Logged out"
  }
  ```

- **Authentication Error (401 Unauthorized):**

  ```json
  {
    "message": "Authentication required"
  }
  ```

---

# Captain Registration API

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system. The endpoint validates the input, hashes the password, creates a captain, and returns the captain data.

## Request Body

Send a JSON object with the following structure:

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

### Field Requirements

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, required, minimum 3 characters
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters
- `vehicle.color`: string, required, minimum 3 characters
- `vehicle.plate`: string, required, minimum 5 characters
- `vehicle.capacity`: integer, required, minimum 1
- `vehicle.vehicleType`: string, required, one of `"car"`, `"motorcycle"`, `"auto"`

## Responses
```json
{

  {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDYzNDE1OTMsImV4cCI6MTc0NjQyNzk5M30.pW2tPjN5-fLv9f8rT8WVQCXDfLSCDlRVI3UmVq6Rz_M"
  }
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
}
```
### Success

- **201 Created**
  - Returns a JSON object containing the created captain object.
  - Example:
    ```json
    {
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
    ```

### Validation Error

- **400 Bad Request**
  - Returns a JSON object with an `errors` array describing validation issues.
  - Example:
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

### Other Errors

- **500 Internal Server Error**
  - Returns a JSON object with an error message if something goes wrong on the server.

---

For more details, see the implementation in [routes/captain.routes.js](routes/captain.routes.js), [controllers/captain.controller.js](controllers/captain.controller.js), and [Services/captain.services.js](Services/captain.services.js).

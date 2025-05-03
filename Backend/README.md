# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. The endpoint validates the input, hashes the password, creates a user, and returns a JWT token along with the user data.

## Request Body

Send a JSON object with the following structure:

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

### Field Requirements

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, optional, minimum 3 characters if provided
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 3 characters

## Responses
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
  "email": "john.doe@example.com",
  "password": "yourpassword"  

  },
  "token": "JWT"

}
```

### Success

- **201 Created**
  - Returns a JSON object containing a JWT token and the created user object.
  - Example:
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

# User Login API

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password. Returns a JWT token and user details if credentials are valid.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters

## Responses
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
  "email": "john.doe@example.com",
  "password": "yourpassword"  

  },
  "token": "JWT"

}
```

### Success

- **200 OK**
  - Returns a JSON object containing a JWT token and the user object.
  - Example:
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

### Authentication Error

- **401 Unauthorized**
  - Returns a JSON object with a message if the email or password is incorrect.
  - Example:
    ```json
    {
      "message": "Invalid Email or Password"
    }
    ```

### Other Errors

- **500 Internal Server Error**
  - Returns a JSON object with an error message if something goes wrong on the server.

---

# User Profile API

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token in the request (as a cookie or in the `Authorization` header).

## Request

- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (if not using cookies)

## Responses
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
  "email": "john.doe@example.com",
  "password": "yourpassword"  

  },
  "token": "JWT"

}
```

### Success

- **200 OK**
  - Returns a JSON object with the user's profile data.
  - Example:
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

### Authentication Error

- **401 Unauthorized**
  - Returns a JSON object if the token is missing or invalid.
  - Example:
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

# User Logout API

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie. Requires a valid JWT token in the request (as a cookie or in the `Authorization` header).

## Request

- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (if not using cookies)

## Responses

### Success

- **200 OK**
  - Returns a JSON object confirming logout.
  - Example:
    ```json
    {
      "message": "Logged out"
    }
    ```

### Authentication Error

- **401 Unauthorized**
  - Returns a JSON object if the token is missing or invalid.
  - Example:
    ```json
    {
      "message": "Authentication required"
    }
    ```

### Other Errors

- **500 Internal Server Error**
  - Returns a JSON object with an error message if something goes wrong on the server.

---

For more details, see the implementation in [routes/user.routes.js](routes/user.routes.js), [controllers/user.controller.js](controllers/user.controller.js), and [Services/user.services.js](Services/user.services.js).
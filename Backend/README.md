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
  "token": "JWT TOKEN"

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

For more details, see the implementation in [routes/user.routes.js](routes/user.routes.js), [controllers/user.controller.js](controllers/user.controller.js), and [Services/user.services.js](Services/user.services.js).
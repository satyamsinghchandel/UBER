# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Validates input, hashes the password, creates a user, and returns user data along with a JWT token.

## Request Body

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

* `fullname.firstname`: string, required, minimum 3 characters
* `fullname.lastname`: string, optional, minimum 3 characters if provided
* `email`: string, required, must be a valid email
* `password`: string, required, minimum 3 characters

## Responses

### Success

* **201 Created**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "user_id",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  }
}
```

### Validation Error

* **400 Bad Request**

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

# User Login API

## Endpoint

`POST /users/login`

## Description

Logs in an existing user using email and password.

## Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

* `email`: string, required, must be a valid email
* `password`: string, required, minimum 6 characters

## Responses

### Success

* **200 OK**

```json
{
  "token": "<JWT_TOKEN>",
  "user": { "_id": "user_id", "email": "john.doe@example.com" }
}
```

### Errors

* **400 Bad Request**: Validation error
* **401 Unauthorized**: Invalid credentials

---

# Get User Profile API

## Endpoint

`GET /users/profile`

## Description

Fetches the logged-in user's profile.

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**: User object
* **401 Unauthorized**

---

# User Logout API

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user.

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**

```json
{ "message": "Logged out" }
```

* **401 Unauthorized**

---

# Captain Registration API

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system. The endpoint validates the input, hashes the password, creates a captain, and returns the captain data.

## Request Body

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

* `fullname.firstname`: string, required, minimum 3 characters
* `fullname.lastname`: string, required, minimum 3 characters
* `email`: string, required, must be a valid email
* `password`: string, required, minimum 6 characters
* `vehicle.color`: string, required, minimum 3 characters
* `vehicle.plate`: string, required, minimum 5 characters
* `vehicle.capacity`: integer, required, minimum 1
* `vehicle.vehicleType`: string, required, one of "car", "motorcycle", "auto"

## Responses

### Success

* **201 Created**

```json
{
  "token": "<JWT_TOKEN>",
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

### Validation Error

* **400 Bad Request**

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

* **500 Internal Server Error**

---

# Captain Login API

## Endpoint

`POST /captains/login`

## Description

Logs in a registered captain with email and password.

## Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

* `email`: string, required
* `password`: string, required, minimum 6 characters

## Responses

* **200 OK**: `{ "token": "...", "captain": { ... } }`
* **400 Bad Request**: Validation error
* **401 Unauthorized**: Invalid credentials

---

# Get Captain Profile API

## Endpoint

`GET /captains/profile`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**: Captain object
* **401 Unauthorized**

---

# Captain Logout API

## Endpoint

`GET /captains/logout`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**: `{ "message": "Logged out Successfully" }`
* **401 Unauthorized**

---

# Get Coordinates API

## Endpoint

`GET /maps/get-coordinates?address=...`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**: `{ "lat": ..., "lng": ... }`
* **400 Bad Request**: Validation errors

---

# Get Distance and Time API

## Endpoint

`GET /maps/get-distance-time?origin=...&destination=...`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**: `{ "distance": "X.XX", "duration": N }`
* **400 Bad Request**: Validation errors

---

# Get Autocomplete Suggestions API

## Endpoint

`GET /maps/get-suggestions?input=...`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**

```json
[
  { "name": "Place 1", "fullAddress": "..." },
  { "name": "Place 2", "fullAddress": "..." }
]
```

* **400 Bad Request**

---

# Create Ride API

## Endpoint

`POST /rides/create`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Request Body

```json
{
  "pickup": "Indore",
  "destination": "Bhopal",
  "vehicleType": "car"
}
```

## Responses

* **201 Created**

```json
{
  "message": "Ride created successfully",
  "ride": { ... }
}
```

* **400 Bad Request**: Validation errors
* **500 Internal Server Error**

---

# Get Fare Estimate API

## Endpoint

`GET /rides/get-fare?pickup=...&destination=...`

## Headers

* `Authorization: Bearer <JWT_TOKEN>`

## Responses

* **200 OK**

```json
{
  "auto": 192.8,
  "car": 295.8,
  "motorcycle": 160.8
}
```

* **400 Bad Request**
* **500 Internal Server Error**

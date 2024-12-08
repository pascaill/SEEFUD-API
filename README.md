# API Documentation

## Table of Contents

1. [Authentication](#authentication)
2. [Admin Authentication](#admin-authentication)
3. [Admin](#admin)
4. [Vendor](#vendor)
5. [Products](#products)
6. [Feedback](#feedback)
7. [Ingredients](#ingredients)

---

## Authentication

### 1. Register User/Vendor

**Endpoint:** `/auth/register`  
**Method:** `POST`  
**Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "vendor/customer"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User created",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "vendor"
    },
    "token": "string"
  }
}
```

---

### 2. Login User/Vendor

**Endpoint:** `/auth/login`  
**Method:** `POST`  
**Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "vendor",
    "token": "string"
  }
}
```

---

### 3. Logout User/Vendor

**Endpoint:** `/auth/logout`  
**Method:** `POST`  
**Response:**

```json
{
  "message": "User logged out successfully"
}
```

---

## Admin Authentication

### 1. Register Admin

**Endpoint:** `/admin/auth/register`  
**Method:** `POST`  
**Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Admin registered successfully",
  "data": {
    "admin": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "token": "string"
  }
}
```

---

### 2. Login Admin

**Endpoint:** `/admin/auth/login`  
**Method:** `POST`  
**Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "token": "string"
  }
}
```

---

### 3. Logout Admin

**Endpoint:** `/admin/auth/logout`  
**Method:** `POST`  
**Response:**

```json
{
  "message": "Admin logged out successfully"
}
```

---

## Admin

### 1. Get Admin Dashboard Counts

**Endpoint:** `/admin/counts`  
**Method:** `GET`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Counts retrieved successfully",
  "data": {
    "totalUsers": 10,
    "totalVendors": 5
  }
}
```

---

### 2. Get Vendors

**Endpoint:** `/admin/vendors`  
**Method:** `GET`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Vendors retrieved successfully",
  "data": [
    {
      "vendorId": 1,
      "name": "Vendor A",
      "location": "City A",
      "rating": 4.5
    }
  ]
}
```

---

### 3. Delete Vendor

**Endpoint:** `/admin/vendors/:vendorId`  
**Method:** `DELETE`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Vendor deleted successfully"
}
```

---

### 4. Update Vendor Rating

**Endpoint:** `/admin/vendors/:vendorId/rating`  
**Method:** `PATCH`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**

```json
{
  "rating": 4.5
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Vendor rating updated successfully"
}
```

---

## Vendor

### 1. Get All Vendors

**Endpoint:** `/vendor`  
**Method:** `GET`  
**Response:**

```json
{
  "status": "success",
  "message": "Vendor collection retrieved successfully",
  "data": [
    {
      "id": 1,
      "store_name": "Vendor 1",
      "description": "Vendor description",
      "location": "Location 1"
    }
  ]
}
```

---

### 2. Create Vendor

**Endpoint:** `/vendor`  
**Method:** `POST`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**

```json
{
  "store_name": "string",
  "description": "string",
  "location": "string"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Vendor created successfully",
  "data": {
    "id": 1,
    "store_name": "Vendor 1",
    "description": "Vendor description",
    "location": "Location 1",
    "rating": 0, // default value
    "is_verified": false // default value
  }
}
```

---

## Products

### 1. Get All Products for Vendor

**Endpoint:** `/products/:vendorId`  
**Method:** `GET`  
**Response:**

```json
{
  "status": "success",
  "message": "Product collection retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Product 1",
      "description": "Product description",
      "price": 100
    }
  ]
}
```

---

### 2. Create Product

**Endpoint:** `/products`  
**Method:** `POST`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**

```json
{
  "name": "string",
  "description": "string",
  "price": 100,
  "qr_code": "string"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Product 1",
    "description": "Product description",
    "price": 100,
    "qr_code": "string"
  }
}
```

---

## Feedback

### 1. Create Feedback

**Endpoint:** `/feedback/:id`  
**Method:** `POST`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**

```json
{
  "rating": 5,
  "comment": "string",
  "report_status": 0
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback created successfully",
  "data": {
    "id": 1,
    "vendor_id": 1,
    "rating": 5,
    "comment": "Great service",
    "report_status": 0
  }
}
```

---

## Ingredients

### 1. Get All Ingredients

**Endpoint:** `/ingredients`  
**Method:** `GET`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Ingredients retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Ingredient A",
      "description": "Description A",
      "qty": 10,
      "unit": "kg"
    }
  ]
}
```

### 2. Create Ingredient

**Endpoint:** `/ingredients`  
**Method:** `POST`  
**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Body:**

```json
{
  "name": "string",
  "description": "string",
  "qty": 10,
  "unit": "kg"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Ingredient created successfully",
  "data": {
    "id": 1,
    "name": "Ingredient A",
    "description": "Description A",
    "qty": 10,
    "unit": "kg"
  }
}
```

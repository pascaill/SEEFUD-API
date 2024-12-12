# API Documentation

Dokumentasi ini menjelaskan cara menggunakan API Anda.

## Daftar Isi

- [Pendahuluan](#pendahuluan)
- [Otentikasi](#otentikasi)
  - [Register User/Vendor](#1-register-uservendor)
  - [Login User/Vendor](#2-login-uservendor)
  - [Logout User/Vendor](#3-logout-uservendor)
- [Otentikasi Admin](#otentikasi-admin)
  - [Register Admin](#1-register-admin)
  - [Login Admin](#2-login-admin)
  - [Logout Admin](#3-logout-admin)
- [Admin](#admin)
  - [Get Admin Dashboard Counts](#1-get-admin-dashboard-counts)
  - [Get Vendors](#2-get-vendors)
  - [Delete Vendor](#3-delete-vendor)
  - [Update Vendor Rating](#4-update-vendor-rating)
  - [Update Feedback Status](#5-update-feedback-status)
  - [Delete User, Vendor, or Customer](#6-delete-user-vendor-or-customer)
- [Vendor](#vendor)
  - [Get All Vendors](#1-get-all-vendors)
  - [Create Vendor](#2-create-vendor)
  - [Get Vendor by ID](#3-get-vendor-by-id)
  - [Update Vendor](#4-update-vendor)
  - [Delete Vendor](#5-delete-vendor)
- [Produk](#produk)
  - [Get All Products for Vendor](#1-get-all-products-for-vendor)
  - [Create Product](#2-create-product)
  - [Update Product](#3-update-product)
  - [Delete Product](#4-delete-product)
- [Feedback](#feedback)
  - [Create Feedback](#1-create-feedback)
  - [Get All Feedback](#2-get-all-feedback)
  - [Get Feedback by ID](#3-get-feedback-by-id)
  - [Update Feedback](#4-update-feedback)
  - [Delete Feedback](#5-delete-feedback)
- [Ingredients](#ingredients)
  - [Get All Ingredients](#1-get-all-ingredients)
  - [Create Ingredient](#2-create-ingredient)

### Pendahuluan

API ini menyediakan akses untuk mengelola data pengguna, vendor, produk, feedback, dan ingredients. API ini memungkinkan developer untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data tersebut, serta melakukan otentikasi dan otorisasi pengguna.

## Otentikasi

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

### 3. Logout User/Vendor

**Endpoint:** `/auth/logout`
**Method:** `POST`
**Response:**

```json
{
  "message": "User logged out successfully"
}
```

## Otentikasi Admin

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

### 3. Logout Admin

**Endpoint:** `/admin/auth/logout`
**Method:** `POST`
**Response:**

```json
{
  "message": "Admin logged out successfully"
}
```

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
    "totalVendors": 5,
    "totalCustomers": 5,
    "totalReports": 2
  }
}
```

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

### 5. Update Feedback Status

**Endpoint:** `/admin/feedback/:id`
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
  "report_status": 1
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback status updated successfully"
}
```

### 6. Delete User, Vendor, or Customer

**Endpoint:** `/admin/users/:id`
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
  "message": "User berhasil dihapus"
}
```

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
      "user_id": 123,
      "store_name": "Vendor 1",
      "description": "Vendor description",
      "location": "Location 1",
      "rating": 4.5,
      "is_verified": true,
      "image": "nama_file.jpg"
    }
  ]
}
```

### 2. Create Vendor

**Endpoint:** `/vendor`
**Method:** `POST`
**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

**Body:**

```
store_name: string
description: string
location: string
image: file // Upload gambar
```

**Response:**

```json
{
  "status": "success",
  "message": "Vendor created successfully",
  "data": {
    "id": 1,
    "user_id": 123,
    "store_name": "Vendor 1",
    "description": "Vendor description",
    "location": "Location 1",
    "rating": 0,
    "is_verified": false,
    "image": "nama_file.jpg"
  }
}
```

### 3. Get Vendor by ID

**Endpoint:** `/vendor/:id`
**Method:** `GET`
**Response:**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "user_id": 123,
    "store_name": "Vendor 1",
    "description": "Vendor description",
    "location": "Location 1",
    "rating": 4.5,
    "is_verified": true,
    "image": "nama_file.jpg"
  }
}
```

### 4. Update Vendor

**Endpoint:** `/vendor/:id`
**Method:** `PUT`
**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

**Body:**

```
store_name: string
description: string
location: string
image: file // Upload gambar
```

**Response:**

```json
{
  "status": "success",
  "message": "Vendor updated successfully",
  "data": {
    "id": 1,
    "store_name": "Vendor 1",
    "description": "Vendor description",
    "location": "Location 1"
  }
}
```

### 5. Delete Vendor

**Endpoint:** `/vendor/:id`
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

## Produk

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
      "vendor_id": 123,
      "name": "Product 1",
      "description": "Product description",
      "price": 100,
      "image": "nama_file.jpg",
      "qr_code": "string"
    }
  ]
}
```

### 2. Create Product

**Endpoint:** `/products`
**Method:** `POST`
**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

**Body:**

```
name: string
description: string
price: number
qr_code: string
image: file // Upload gambar
```

**Response:**

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "vendor_id": 123,
    "name": "Product 1",
    "description": "Product description",
    "price": 100,
    "image": "nama_file.jpg",
    "qr_code": "string"
  }
}
```

### 3. Update Product

**Endpoint:** `/products/:id`
**Method:** `PUT`
**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

**Body:**

```
name: string
description: string
price: number
qr_code: string
image: file // Upload gambar
```

**Response:**

```json
{
  "status": "success",
  "message": "Product updated successfully"
}
```

### 4. Delete Product

**Endpoint:** `/products/:id`
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
  "message": "Product deleted successfully"
}
```

## Feedback

### 1. Create Feedback

**Endpoint:** `/feedback/:id`
**Method:** `POST`
**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

**Body:**

```
rating: number
comment: string
foto: file // Upload gambar
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback created successfully",
  "data": {
    "id": 1,
    "user_id": 123,
    "vendor_id": 1,
    "rating": 5,
    "comment": "Great service",
    "report_status": 0,
    "foto": "nama_file.jpg"
  }
}
```

### 2. Get All Feedback

**Endpoint:** `/feedback`
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
  "data": [
    // Array of feedback objects
  ]
}
```

### 3. Get Feedback by ID

**Endpoint:** `/feedback/:id`
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
  "data": {
    // Feedback object
  }
}
```

### 4. Update Feedback

**Endpoint:** `/feedback/:id`
**Method:** `PATCH`
**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

**Body:**

```
rating: number
comment: string
foto: file // Upload gambar
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback updated successfully"
}
```

### 5. Delete Feedback

**Endpoint:** `/feedback/:id`
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
  "message": "Feedback deleted successfully"
}
```

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
      "image": "nama_file.jpg",
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
  "Authorization": "Bearer <token>",
  "content-Type": "multipart/form-data"
}
```

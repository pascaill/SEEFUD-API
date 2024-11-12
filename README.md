# **To do checklist:**
- ~~User Endpoint (Consumer, Vendor, Admin)~~
- ~~Feedback Endpoint~~
- ~~Connect to Database (mysql)~~
- ~~Connect to Cloud (Google Cloud)~~
- Search Feature
- Review
- QR Scanner

# SeeFud Management API Testing Guide

This guide provides instructions on how to use the SeeFud Management API Postman collection to test various API endpoints related to user authentication, profile management, vendor operations, and product management. Follow the steps below to import the collection and execute each endpoint.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Importing the Postman Collection](#importing-the-postman-collection)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Endpoint Testing](#endpoint-testing)
  - [User Authentication](#user-authentication)
  - [User Profile](#user-profile)
  - [Vendor Dashboard](#vendor-dashboard)
  - [Vendor](#vendor)
  - [Product](#product)


## Prerequisites

- Install [Postman](https://www.postman.com/downloads/) on your machine.
- Obtain the `SeeFud Management API` Postman collection in JSON format.

## Importing the Postman Collection

1. Open Postman.
2. Click on **Import** in the top-left corner.
3. Select **Upload Files** and choose the `SeeFud Management API` collection JSON file.
4. Once imported, the collection should appear in your Postman sidebar.

## Setting Up Environment Variables

This collection uses environment variables to manage dynamic data, such as the base URL and authentication tokens.

1. Go to **Environments** in Postman and create a new environment (e.g., `SeeFud API Environment`).
2. Add the following variables:
   - `baseUrl`: Set this to the base URL of your API (e.g., `https://api.example.com`).
   - `authToken`: This will be dynamically set after a successful login.
   - `userId`: This will be dynamically set after login.
   - `vendorId` and `productId`: These will be set after creating a vendor or product.
3. Save the environment and select it before running the collection.

## Endpoint Testing

### User Authentication

- **Register**: Creates a new user account.

  - **Method**: `POST`
  - **URL**: `{{baseUrl}}/register`
  - **Body**:
    ```json
    {
      "name": "testuser",
      "email": "test@example.com",
      "password": "password123",
      "role": "vendor" // admin|vendor|customer
    }
    ```

- **Login**: Authenticates an existing user and stores the auth token.

  - **Method**: `POST`
  - **URL**: `{{baseUrl}}/login`
  - **Body**:
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
  - **Note**: This request stores `authToken` and `userId` for use in other requests.

- **Logout**: Logs out the authenticated user.
  - **Method**: `POST`
  - **URL**: `{{baseUrl}}/logout`
  - **Headers**: `Authorization: Bearer {{authToken}}`

### User Profile

- **Update Profile**: Updates user information.

  - **Method**: `PUT`
  - **URL**: `{{baseUrl}}/profile`
  - **Body**:
    ```json
    {
      "name": "updatedName",
      "email": "updated@example.com"
    }
    ```

- **Delete Account**: Deletes the user account.
  - **Method**: `DELETE`
  - **URL**: `{{baseUrl}}/profile`
  - **Body**:
    ```json
    {
      "email": "test@example.com"
    }
    ```

### Vendor Dashboard

- **Access Dashboard**: Retrieves vendor dashboard data.
  - **Method**: `GET`
  - **URL**: `{{baseUrl}}/vendor/dashboard`
  - **Headers**: `Authorization: Bearer {{authToken}}`

### Vendor

- **Create Vendor**: Registers a new vendor.

  - **Method**: `POST`
  - **URL**: `{{baseUrl}}/vendor`
  - **Body**:
    ```json
    {
      "user_id": {{userId}},
      "store_name": "Store Example",
      "description": "A sample description",
      "location": "Sample Location"
    }
    ```
  - **Note**: Stores `vendorId` for future requests.

- **Get Vendor**: Retrieves vendor details.

  - **Method**: `GET`
  - **URL**: `{{baseUrl}}/vendor/{{vendorId}}`

- **Update Vendor**: Updates vendor information.

  - **Method**: `PUT`
  - **URL**: `{{baseUrl}}/vendor/{{vendorId}}`
  - **Body**:
    ```json
    {
      "store_name": "Updated Store Name",
      "description": "Updated description"
    }
    ```

- **Delete Vendor**: Deletes the vendor.
  - **Method**: `DELETE`
  - **URL**: `{{baseUrl}}/vendor/{{vendorId}}`

### Product

- **Create Product**: Adds a new product under a vendor.

  - **Method**: `POST`
  - **URL**: `{{baseUrl}}/product`
  - **Body**:
    ```json
    {
      "vendor_id": {{vendorId}},
      "name": "Product Example",
      "description": "Product description",
      "price": 100.50,
      "qr_code": "SampleQRCodeData"
    }
    ```
  - **Note**: Stores `productId` for future requests.

- **Get Product**: Retrieves product details.

  - **Method**: `GET`
  - **URL**: `{{baseUrl}}/product/{{productId}}`

- **Update Product**: Updates product details.

  - **Method**: `PUT`
  - **URL**: `{{baseUrl}}/product/{{productId}}`
  - **Body**:
    ```json
    {
      "name": "Updated Product Name",
      "description": "Updated product description",
      "price": 200.75,
      "qr_code": "UpdatedQRCodeData"
    }
    ```

- **Delete Product**: Deletes the product.
  - **Method**: `DELETE`
  - **URL**: `{{baseUrl}}/product/{{productId}}`

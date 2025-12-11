# E-Commerce Backend API

### Node.js • Express • TypeScript • MongoDB

## Overview

This project is a fully functional **E‑Commerce Backend API** built
using a clean, scalable, and production‑ready architecture.\
It includes complete modules for authentication, users, categories,
products, cart, orders, reviews, and admin operations.

The system supports image upload with **Cloudinary**, request validation
with **Zod**, token‑based authentication with JWT, and full CRUD
operations across all modules.

------------------------------------------------------------------------

## Tech Stack

-   Node.js\
-   Express.js\
-   TypeScript\
-   MongoDB & Mongoose\
-   Zod Validation\
-   JWT Authentication\
-   Cloudinary for File Uploads\
-   Express Rate Limiter\
-   Clean Architecture (Repository + Factory + DTO + Entity)

------------------------------------------------------------------------

## Features

### Authentication

-   Register & verify account via OTP
-   login & logout
-   Refresh & Access tokens
-   Password reset
-   Authorization (Admin/User)

### User Module

-   Update profile
-   Retrieve user info

### Category Module

-   Admin CRUD
-   Link products to categories

### Product Module

-   Add / update / delete products
-   Upload single & multiple images
-   Cloudinary storage
-   Search products
-   Sort products
-   Populate relations (category, createdBy, updatedBy)

### Cart Module

-   Add/Remove items
-   Update quantity
-   Auto-calculate total price
-   Clear cart

### Order Module

-   Create Order
-   Stock + sold updates
-   Cancel Order (restore stock)
-   Admin update order status
-   User view pending order

### Review Module

-   Add review only after confirmed order
-   Update review
-   Admin view all reviews for a product

------------------------------------------------------------------------

## Project Structure

    src/
    ├── DB/
    │   ├── abstraction.repository.ts
    │   ├── category/
    │   ├── product/
    │   ├── user/
    │   ├── cart/
    │   ├── order/
    │   └── review/
    ├── modules/
    │   ├── auth/
    │   ├── user/
    │   ├── category/
    │   ├── product/
    │   ├── cart/
    │   ├── order/
    │   └── review/
    ├── utils/
    ├── middleware/
    └── app.ts

------------------------------------------------------------------------

## Installation

``` bash
cd project-folder
npm install
```

## Run App

``` bash
npm run start:dev
```

------------------------------------------------------------------------

## Environment Variables

    MONGO_URI=
    JWT_SECRET=
    JWT_REFRESH_SECRET=
    CLOUD_NAME=
    CLOUD_API_KEY=
    CLOUD_API_SECRET=


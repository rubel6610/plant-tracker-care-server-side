# 🌿 Plant Care Tracker - Server

This is the **Express.js backend** for the Plant Care Tracker web application. It connects to MongoDB, handles CRUD operations for plant data, and serves secure API endpoints used by the client-side React application.

---

## 🌐 Live Client Website

**Frontend:** [https://plant-care-tracker.web.app](https://plant-care-tracker.web.app)

---

## 🚀 Features

- 📦 **MongoDB Integration** — Stores and retrieves plant data using MongoDB Atlas.
- 🌱 **CRUD Operations** — Create, Read, Update, and Delete plants efficiently.
- 🔐 **User-Specific Data** — Fetch plants added by specific users using email query.
- 🔄 **RESTful APIs** — Well-structured endpoints for integration with the frontend.
- 🛡️ **CORS & JSON Middleware** — Cross-Origin support and JSON parsing enabled.

---

## 📁 Endpoints Overview

| Method | Endpoint                    | Description                             |
|--------|-----------------------------|-----------------------------------------|
| GET    | `/plants`                   | Get all plant data                      |
| POST   | `/plants`                   | Add a new plant                         |
| GET    | `/singleplants/:id`         | Get a specific plant by ID              |
| GET    | `/myplants?email=user@email.com` | Get plants added by a specific user |
| PUT    | `/myplants/:id`             | Update a plant by ID                    |
| DELETE | `/plants/:id`               | Delete a plant by ID                    |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

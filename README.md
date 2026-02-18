# Products Service (Pure Node.js)

A simple RESTful API for managing products, built using **pure Node.js**
(no Express, no frameworks).

This project is part of **Week 02 – Milestone #2 (Backend Internship Practice)**.

---

## 🚀 Features

- In-memory product storage
- RESTful routes
- JSON request/response format
- Input validation
- Proper HTTP status codes
- Search functionality
- Pagination (limit & offset)
- 405 Method Not Allowed handling
- Automated tests

---

## 🛠 Tech Stack

- Node.js (native `http` module)
- No framework (pure Node)
- Node built-in test runner
- curl for manual testing

---

## 📦 Getting Started

### Install dependencies

```bash
pnpm install
```

### Start the server

```bash
pnpm start
```

Server runs at:

```
http://localhost:3000
```

---

## 📌 API Endpoints

### 1️⃣ Health Check

```
GET /health
```

Response:

```json
{ "status": "ok" }
```

---

### 2️⃣ Get All Products

```
GET /products
```

Supports query parameters:

- `search` (string)
- `limit` (number > 0)
- `offset` (number >= 0)

Example:

```bash
curl "http://localhost:3000/products?search=phone&limit=2&offset=0"
```

---

### 3️⃣ Get Product by ID

```
GET /products/:id
```

Example:

```bash
curl http://localhost:3000/products/p123
```

If product not found:

```json
{
  "error": "Product with id \"p123\" not found."
}
```

---

### 4️⃣ Create Product

```
POST /products
```

Example:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Phone","price":500}'
```

Response:

- `201 Created`

---

### 5️⃣ Update Product

```
PUT /products/:id
```

Example:

```bash
curl -X PUT http://localhost:3000/products/p123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook","price":900}'
```

---

### 6️⃣ Delete Product

```
DELETE /products/:id
```

Example:

```bash
curl -X DELETE http://localhost:3000/products/p123
```

Response:

- `204 No Content`

---

## ⚠ Error Handling

### 404 Not Found

```json
{
  "error": "Cannot GET /unknown"
}
```

### 405 Method Not Allowed

If route exists but method is not allowed:

```json
{
  "error": "Method PATCH not allowed for /products"
}
```

### 400 Bad Request (Invalid JSON)

```json
{
  "error": "Invalid JSON. Make sure request body is valid JSON and Content-Type is application/json."
}
```

---

## 🧪 Validation Rules

- `name`: required, non-empty string (min length 2)
- `price`: required, valid number, >= 0

Invalid input returns:

```
400 Bad Request
```

With:

```json
{
  "errors": ["name is required and must be a non-empty string."]
}
```

---

## 🧪 Running Tests

```bash
pnpm test
```

Tests cover:

- Health check
- List products
- Get product by ID
- Create product
- Update product
- Delete product

---

## 📌 Notes

- Data is stored in memory
- Restarting the server resets products
- No database is used
- Built using pure Node.js (no Express)

---

## 👨‍💻 Author

Mohammad Yousaf  
Backend Practice – Week 02

---



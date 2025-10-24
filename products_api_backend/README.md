# Products API (Express)

Simple REST API for managing products with in-memory storage.

- Port: 3001
- Docs: GET /docs

## Endpoints

- GET /products — List all products
- GET /products/:id — Retrieve a single product
- POST /products — Create a product
- PUT /products/:id — Update a product
- DELETE /products/:id — Delete a product

### Data model
- id: number (auto-increment)
- name: string (required)
- price: number >= 0 (required)
- quantity: integer >= 0 (required)

### Example requests

List:
curl -s http://localhost:3001/products

Create:
curl -s -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99,"quantity":10}'

Get by id:
curl -s http://localhost:3001/products/1

Update:
curl -s -X PUT http://localhost:3001/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro","price":1299.99,"quantity":8}'

Delete:
curl -s -X DELETE http://localhost:3001/products/1

### Responses

- Success:
{
  "status": "success",
  "message": "Product created successfully",
  "data": { "id": 1, "name": "Laptop", "price": 999.99, "quantity": 10 }
}

- 400 Validation error:
{
  "status": "error",
  "message": "Invalid product payload",
  "errors": ["price must be >= 0"]
}

- 404 Not found:
{
  "status": "error",
  "message": "Product not found"
}

### Run

npm install
npm run dev
# or
npm start

Service will be available on http://localhost:3001 and docs at http://localhost:3001/docs

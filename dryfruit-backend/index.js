const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage (for demo)
const orders = [];

// Health check route
app.get("/", (req, res) => {
  res.send("Dry Fruit Order API is running ✅");
});

// POST /api/orders - receive new order
app.post("/api/orders", (req, res) => {
  const { name, phone, address, product, quantity } = req.body;

  // Basic validation
  if (!name || !phone || !address || !product || !quantity) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newOrder = {
    id: orders.length + 1,
    name,
    phone,
    address,
    product,
    quantity,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  console.log("New order received:", newOrder);

  res.status(201).json({
    message: "Order received successfully!",
    order: newOrder,
  });
});

// (Optional) GET /api/orders - list all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

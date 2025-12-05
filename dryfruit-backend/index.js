require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Read PORT and Mongo URI from .env
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// 1) Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      // options are mostly optional in latest versions, but keeping for clarity
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit if we can't connect
  }
}

// 2) Define Order schema & model
const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

const Order = mongoose.model("Order", orderSchema);

// 3) Routes

// Health check
app.get("/", (req, res) => {
  res.send("Dry Fruit Order API is running ✅");
});

// Create new order (POST /api/orders)
app.post("/api/orders", async (req, res) => {
  try {
    const { name, phone, address, product, quantity } = req.body;

    // Basic validation
    if (!name || !phone || !address || !product || !quantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create order in DB
    const newOrder = await Order.create({
      name,
      phone,
      address,
      product,
      quantity,
    });

    console.log("🆕 New order saved:", newOrder);

    res.status(201).json({
      message: "Order received successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Server error while creating order." });
  }
});

// Get all orders (GET /api/orders) - for admin usage later
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

// 4) Start server AFTER DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});

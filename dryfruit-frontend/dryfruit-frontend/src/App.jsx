import { useState } from "react";
import "./App.css";

const PRODUCTS = [
  { id: "cashew", name: "Cashew (Kaju)", description: "Premium whole cashew nuts." },
  { id: "badam", name: "Badam (Almonds)", description: "High-quality California almonds." },
  { id: "kaju", name: "Kaju", description: "Roasted kaju with rich taste." },
  { id: "pista", name: "Pista", description: "Crunchy salted pistachios." },
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    product: "",
    quantity: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // Basic front-end validation
    if (!formData.name || !formData.phone || !formData.address || !formData.product || !formData.quantity) {
      setStatus({ type: "error", message: "Please fill all fields." });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus({ type: "success", message: data.message || "Order placed successfully!" });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        product: "",
        quantity: "",
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to place order." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Fresh Dry Fruits</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#order">Order</a>
        </nav>
      </header>

      {/* Hero + Products */}
      <main>
        <section id="home" className="hero">
          <div className="hero-text">
            <h1>Premium Dry Fruits Delivered to Your Home</h1>
            <p>Fresh cashew, badam, kaju and pista – perfect for daily snacking and gifting.</p>
            <a href="#order" className="hero-button">
              Order Now
            </a>
          </div>
        </section>

        <section className="products">
          <h2>Our Dry Fruits</h2>
          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-placeholder">
                  {/* You can replace this with actual images later */}
                  <span>{product.name.charAt(0)}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Order Form */}
        <section id="order" className="order-section">
          <h2>Place Your Order</h2>
          <p>Fill in your details and we will contact you to confirm the order.</p>

          <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Full Address
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no, street, area, city, pincode"
                  rows={3}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Select Dry Fruit
                <select name="product" value={formData.product} onChange={handleChange}>
                  <option value="">-- Select --</option>
                  {PRODUCTS.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Quantity (in kg or grams)
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 1 kg, 500 g"
                />
              </label>
            </div>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Placing Order..." : "Submit Order"}
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Fresh Dry Fruits. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

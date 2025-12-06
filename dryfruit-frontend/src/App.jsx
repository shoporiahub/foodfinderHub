import { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const PRODUCTS = [
  { id: "cashew", name: "Cashew (Kaju)", description: "Premium whole cashew nuts." },
  { id: "badam", name: "Badam (Almonds)", description: "High-quality California almonds." },
  { id: "kaju", name: "Kaju", description: "Roasted kaju with rich taste." },
  { id: "pista", name: "Pista", description: "Crunchy salted pistachios." },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function submitOrder(payload, setStatus, setIsSubmitting, resetFn) {
  setStatus({ type: "", message: "" });

  try {
    setIsSubmitting(true);

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setStatus({ type: "success", message: data.message || "Order placed successfully!" });
    resetFn();
  } catch (err) {
    setStatus({ type: "error", message: err.message || "Failed to place order." });
  } finally {
    setIsSubmitting(false);
  }
}

/* ---------- PAGES ---------- */

function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Premium Dry Fruits for Home, Shops & Weddings</h1>
          <p>
            Fresh kaju, badam, pista and more – order for home use, your shop, or bulk wedding requirements.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/home-use" className="hero-button">
              Order for Home
            </Link>
            <Link to="/shopkeeper" className="hero-button">
              Shopkeeper Bulk Order
            </Link>
            <Link to="/wedding" className="hero-button">
              Wedding Order
            </Link>
          </div>
        </div>
      </section>

      <section className="products">
        <h2>Our Dry Fruits</h2>
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-placeholder">
                <span>{product.name.charAt(0)}</span>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function HomeUsePage() {
  const [form, setForm] = useState({
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.product || !form.quantity) {
      setStatus({ type: "error", message: "Please fill all fields." });
      return;
    }

    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      orderType: "retail",
      items: [
        {
          product: form.product,
          quantityKg: Number(form.quantity) || 0,
        },
      ],
      product: form.product,
      quantity: form.quantity,
    };

    await submitOrder(payload, setStatus, setIsSubmitting, () =>
      setForm({
        name: "",
        phone: "",
        address: "",
        product: "",
        quantity: "",
      })
    );
  };

  return (
    <section className="order-section">
      <h2>Home Use Order</h2>
      <p>Simple dry fruit order for home or gifting.</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
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
              value={form.phone}
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
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, area, city, pincode"
              rows={3}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Select Dry Fruit
            <select name="product" value={form.product} onChange={handleChange}>
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
            Quantity (in kg)
            <input
              type="number"
              min="0"
              step="0.25"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="e.g. 1"
            />
          </label>
        </div>

        {status.message && <div className={`status-message ${status.type}`}>{status.message}</div>}

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Order..." : "Submit Order"}
        </button>
      </form>
    </section>
  );
}

function ShopkeeperPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    shopName: "",
    cashewKg: "",
    badamKg: "",
    kajuKg: "",
    pistaKg: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      setStatus({ type: "error", message: "Please fill name, phone and address." });
      return;
    }

    const items = [];
    if (form.cashewKg) items.push({ product: "Cashew (Kaju)", quantityKg: Number(form.cashewKg) });
    if (form.badamKg) items.push({ product: "Badam (Almonds)", quantityKg: Number(form.badamKg) });
    if (form.kajuKg) items.push({ product: "Kaju", quantityKg: Number(form.kajuKg) });
    if (form.pistaKg) items.push({ product: "Pista", quantityKg: Number(form.pistaKg) });

    if (items.length === 0) {
      setStatus({ type: "error", message: "Please enter at least one product quantity." });
      return;
    }

    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      shopName: form.shopName,
      orderType: "bulk",
      items,
    };

    await submitOrder(payload, setStatus, setIsSubmitting, () =>
      setForm({
        name: "",
        phone: "",
        address: "",
        shopName: "",
        cashewKg: "",
        badamKg: "",
        kajuKg: "",
        pistaKg: "",
      })
    );
  };

  return (
    <section className="order-section">
      <h2>Shopkeeper Bulk Order</h2>
      <p>Place bulk orders for your shop – enter quantities in kg for each dry fruit.</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Shopkeeper Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Shop Name (optional)
            <input
              type="text"
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              placeholder="Enter your shop name"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Shop Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shop address with city and pincode"
              rows={3}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Cashew (Kaju) in kg
            <input
              type="number"
              min="0"
              step="1"
              name="cashewKg"
              value={form.cashewKg}
              onChange={handleChange}
              placeholder="e.g. 5"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Badam (Almonds) in kg
            <input
              type="number"
              min="0"
              step="1"
              name="badamKg"
              value={form.badamKg}
              onChange={handleChange}
              placeholder="e.g. 4"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Kaju in kg
            <input
              type="number"
              min="0"
              step="1"
              name="kajuKg"
              value={form.kajuKg}
              onChange={handleChange}
              placeholder="e.g. 3"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Pista in kg
            <input
              type="number"
              min="0"
              step="1"
              name="pistaKg"
              value={form.pistaKg}
              onChange={handleChange}
              placeholder="e.g. 2"
            />
          </label>
        </div>

        {status.message && <div className={`status-message ${status.type}`}>{status.message}</div>}

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Bulk Order..." : "Submit Bulk Order"}
        </button>
      </form>
    </section>
  );
}

function WeddingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    eventDate: "",
    guestsCount: "",
    cashewKg: "",
    badamKg: "",
    kajuKg: "",
    pistaKg: "",
    notes: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      setStatus({ type: "error", message: "Please fill name, phone and address." });
      return;
    }

    const items = [];
    if (form.cashewKg) items.push({ product: "Cashew (Kaju)", quantityKg: Number(form.cashewKg) });
    if (form.badamKg) items.push({ product: "Badam (Almonds)", quantityKg: Number(form.badamKg) });
    if (form.kajuKg) items.push({ product: "Kaju", quantityKg: Number(form.kajuKg) });
    if (form.pistaKg) items.push({ product: "Pista", quantityKg: Number(form.pistaKg) });

    if (items.length === 0) {
      setStatus({ type: "error", message: "Please enter at least one product quantity." });
      return;
    }

    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      orderType: "wedding",
      eventDate: form.eventDate,
      guestsCount: form.guestsCount ? Number(form.guestsCount) : undefined,
      notes: form.notes,
      items,
    };

    await submitOrder(payload, setStatus, setIsSubmitting, () =>
      setForm({
        name: "",
        phone: "",
        address: "",
        eventDate: "",
        guestsCount: "",
        cashewKg: "",
        badamKg: "",
        kajuKg: "",
        pistaKg: "",
        notes: "",
      })
    );
  };

  return (
    <section className="order-section">
      <h2>Wedding Dry Fruit Order</h2>
      <p>Planning a wedding? Order dry fruits in bulk for gifts, hampers or serving guests.</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Contact Person Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Wedding Venue / Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Venue name and full address"
              rows={3}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Wedding Date
            <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Approx. Number of Guests
            <input
              type="number"
              min="0"
              name="guestsCount"
              value={form.guestsCount}
              onChange={handleChange}
              placeholder="e.g. 300"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Cashew (Kaju) in kg
            <input
              type="number"
              min="0"
              step="1"
              name="cashewKg"
              value={form.cashewKg}
              onChange={handleChange}
              placeholder="e.g. 10"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Badam (Almonds) in kg
            <input
              type="number"
              min="0"
              step="1"
              name="badamKg"
              value={form.badamKg}
              onChange={handleChange}
              placeholder="e.g. 8"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Kaju in kg
            <input
              type="number"
              min="0"
              step="1"
              name="kajuKg"
              value={form.kajuKg}
              onChange={handleChange}
              placeholder="e.g. 6"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Pista in kg
            <input
              type="number"
              min="0"
              step="1"
              name="pistaKg"
              value={form.pistaKg}
              onChange={handleChange}
              placeholder="e.g. 4"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Any notes (packing, budget, etc.)
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Share any special requirements"
              rows={3}
            />
          </label>
        </div>

        {status.message && <div className={`status-message ${status.type}`}>{status.message}</div>}

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Wedding Order..." : "Submit Wedding Order"}
        </button>
      </form>
    </section>
  );
}

/* ---------- APP SHELL WITH ROUTES ---------- */

function App() {
  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Fresh Dry Fruits
          </Link>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/home-use">Home Use</NavLink>
          <NavLink to="/shopkeeper">Shopkeeper</NavLink>
          <NavLink to="/wedding">Wedding</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home-use" element={<HomeUsePage />} />
          <Route path="/shopkeeper" element={<ShopkeeperPage />} />
          <Route path="/wedding" element={<WeddingPage />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Fresh Dry Fruits. All rights reserved.
      </footer>

      <Analytics />

    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";

const PRODUCTS = [
  { id: "cashew", name: "Cashew (Kaju)", description: "Premium whole cashew nuts." },
  { id: "badam", name: "Badam (Almonds)", description: "High-quality California almonds." },
  { id: "kaju", name: "Kaju", description: "Roasted kaju with rich taste." },
  { id: "pista", name: "Pista", description: "Crunchy salted pistachios." },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Reusable helper to submit any kind of order
async function submitOrder(payload, setStatus, setIsSubmitting, resetFn) {
  setStatus({ type: "", message: "" });

  try {
    setIsSubmitting(true);

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

function App() {
  // Normal customer order (existing)
  const [retailForm, setRetailForm] = useState({
    name: "",
    phone: "",
    address: "",
    product: "",
    quantity: "",
  });
  const [retailStatus, setRetailStatus] = useState({ type: "", message: "" });
  const [retailSubmitting, setRetailSubmitting] = useState(false);

  // Shopkeeper bulk order form
  const [shopForm, setShopForm] = useState({
    name: "",
    phone: "",
    address: "",
    shopName: "",
    cashewKg: "",
    badamKg: "",
    kajuKg: "",
    pistaKg: "",
  });
  const [shopStatus, setShopStatus] = useState({ type: "", message: "" });
  const [shopSubmitting, setShopSubmitting] = useState(false);

  // Wedding order form
  const [weddingForm, setWeddingForm] = useState({
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
  const [weddingStatus, setWeddingStatus] = useState({ type: "", message: "" });
  const [weddingSubmitting, setWeddingSubmitting] = useState(false);

  // Handlers for retail form
  const handleRetailChange = (e) => {
    const { name, value } = e.target;
    setRetailForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRetailSubmit = async (e) => {
    e.preventDefault();

    if (!retailForm.name || !retailForm.phone || !retailForm.address || !retailForm.product || !retailForm.quantity) {
      setRetailStatus({ type: "error", message: "Please fill all fields." });
      return;
    }

    const payload = {
      name: retailForm.name,
      phone: retailForm.phone,
      address: retailForm.address,
      orderType: "retail",
      // send as items array, backend still supports old fields too
      items: [
        {
          product: retailForm.product,
          quantityKg: Number(retailForm.quantity) || 0,
        },
      ],
      // fallback old fields
      product: retailForm.product,
      quantity: retailForm.quantity,
    };

    await submitOrder(payload, setRetailStatus, setRetailSubmitting, () =>
      setRetailForm({
        name: "",
        phone: "",
        address: "",
        product: "",
        quantity: "",
      })
    );
  };

  // Handlers for shopkeeper bulk form
  const handleShopChange = (e) => {
    const { name, value } = e.target;
    setShopForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleShopSubmit = async (e) => {
    e.preventDefault();

    if (!shopForm.name || !shopForm.phone || !shopForm.address) {
      setShopStatus({ type: "error", message: "Please fill name, phone and address." });
      return;
    }

    const items = [];
    if (shopForm.cashewKg) items.push({ product: "Cashew (Kaju)", quantityKg: Number(shopForm.cashewKg) });
    if (shopForm.badamKg) items.push({ product: "Badam (Almonds)", quantityKg: Number(shopForm.badamKg) });
    if (shopForm.kajuKg) items.push({ product: "Kaju", quantityKg: Number(shopForm.kajuKg) });
    if (shopForm.pistaKg) items.push({ product: "Pista", quantityKg: Number(shopForm.pistaKg) });

    if (items.length === 0) {
      setShopStatus({ type: "error", message: "Please enter at least one product quantity." });
      return;
    }

    const payload = {
      name: shopForm.name,
      phone: shopForm.phone,
      address: shopForm.address,
      shopName: shopForm.shopName,
      orderType: "bulk",
      items,
    };

    await submitOrder(payload, setShopStatus, setShopSubmitting, () =>
      setShopForm({
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

  // Handlers for wedding form
  const handleWeddingChange = (e) => {
    const { name, value } = e.target;
    setWeddingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeddingSubmit = async (e) => {
    e.preventDefault();

    if (!weddingForm.name || !weddingForm.phone || !weddingForm.address) {
      setWeddingStatus({ type: "error", message: "Please fill name, phone and address." });
      return;
    }

    const items = [];
    if (weddingForm.cashewKg) items.push({ product: "Cashew (Kaju)", quantityKg: Number(weddingForm.cashewKg) });
    if (weddingForm.badamKg) items.push({ product: "Badam (Almonds)", quantityKg: Number(weddingForm.badamKg) });
    if (weddingForm.kajuKg) items.push({ product: "Kaju", quantityKg: Number(weddingForm.kajuKg) });
    if (weddingForm.pistaKg) items.push({ product: "Pista", quantityKg: Number(weddingForm.pistaKg) });

    if (items.length === 0) {
      setWeddingStatus({ type: "error", message: "Please enter at least one product quantity." });
      return;
    }

    const payload = {
      name: weddingForm.name,
      phone: weddingForm.phone,
      address: weddingForm.address,
      orderType: "wedding",
      eventDate: weddingForm.eventDate,
      guestsCount: weddingForm.guestsCount ? Number(weddingForm.guestsCount) : undefined,
      notes: weddingForm.notes,
      items,
    };

    await submitOrder(payload, setWeddingStatus, setWeddingSubmitting, () =>
      setWeddingForm({
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
    <div className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Fresh Dry Fruits</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#order">Customer Order</a>
          <a href="#bulk-order">Shopkeeper</a>
          <a href="#wedding-order">Wedding</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="hero">
          <div className="hero-text">
            <h1>Premium Dry Fruits Delivered to Your Doorstep</h1>
            <p>Order for your home, your shop, or your wedding – fresh kaju, badam, pista and more.</p>
            <a href="#order" className="hero-button">
              Order for Home
            </a>
          </div>
        </section>

        {/* Products */}
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

        {/* Normal customer order */}
        <section id="order" className="order-section">
          <h2>Place Your Order (Home Use)</h2>
          <p>Simple dry fruit order for home or gifting.</p>

          <form className="order-form" onSubmit={handleRetailSubmit}>
            <div className="form-row">
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={retailForm.name}
                  onChange={handleRetailChange}
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
                  value={retailForm.phone}
                  onChange={handleRetailChange}
                  placeholder="Enter your phone number"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Full Address
                <textarea
                  name="address"
                  value={retailForm.address}
                  onChange={handleRetailChange}
                  placeholder="House no, street, area, city, pincode"
                  rows={3}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Select Dry Fruit
                <select name="product" value={retailForm.product} onChange={handleRetailChange}>
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
                  value={retailForm.quantity}
                  onChange={handleRetailChange}
                  placeholder="e.g. 1"
                />
              </label>
            </div>

            {retailStatus.message && (
              <div className={`status-message ${retailStatus.type}`}>{retailStatus.message}</div>
            )}

            <button className="submit-button" type="submit" disabled={retailSubmitting}>
              {retailSubmitting ? "Placing Order..." : "Submit Order"}
            </button>
          </form>
        </section>

        {/* Shopkeeper bulk order */}
        <section id="bulk-order" className="order-section">
          <h2>Shopkeeper Bulk Order</h2>
          <p>Place bulk orders for your shop – enter quantities in kg for each dry fruit.</p>

          <form className="order-form" onSubmit={handleShopSubmit}>
            <div className="form-row">
              <label>
                Shopkeeper Name
                <input
                  type="text"
                  name="name"
                  value={shopForm.name}
                  onChange={handleShopChange}
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
                  value={shopForm.shopName}
                  onChange={handleShopChange}
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
                  value={shopForm.phone}
                  onChange={handleShopChange}
                  placeholder="Enter your phone number"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Shop Address
                <textarea
                  name="address"
                  value={shopForm.address}
                  onChange={handleShopChange}
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
                  value={shopForm.cashewKg}
                  onChange={handleShopChange}
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
                  value={shopForm.badamKg}
                  onChange={handleShopChange}
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
                  value={shopForm.kajuKg}
                  onChange={handleShopChange}
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
                  value={shopForm.pistaKg}
                  onChange={handleShopChange}
                  placeholder="e.g. 2"
                />
              </label>
            </div>

            {shopStatus.message && (
              <div className={`status-message ${shopStatus.type}`}>{shopStatus.message}</div>
            )}

            <button className="submit-button" type="submit" disabled={shopSubmitting}>
              {shopSubmitting ? "Placing Bulk Order..." : "Submit Bulk Order"}
            </button>
          </form>
        </section>

        {/* Wedding order */}
        <section id="wedding-order" className="order-section">
          <h2>Wedding Dry Fruit Order</h2>
          <p>Planning a wedding? Order dry fruits in bulk for gifts, hampers or serving guests.</p>

          <form className="order-form" onSubmit={handleWeddingSubmit}>
            <div className="form-row">
              <label>
                Contact Person Name
                <input
                  type="text"
                  name="name"
                  value={weddingForm.name}
                  onChange={handleWeddingChange}
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
                  value={weddingForm.phone}
                  onChange={handleWeddingChange}
                  placeholder="Enter your phone number"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Wedding Venue / Address
                <textarea
                  name="address"
                  value={weddingForm.address}
                  onChange={handleWeddingChange}
                  placeholder="Venue name and full address"
                  rows={3}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Wedding Date
                <input
                  type="date"
                  name="eventDate"
                  value={weddingForm.eventDate}
                  onChange={handleWeddingChange}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Approx. Number of Guests
                <input
                  type="number"
                  min="0"
                  name="guestsCount"
                  value={weddingForm.guestsCount}
                  onChange={handleWeddingChange}
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
                  value={weddingForm.cashewKg}
                  onChange={handleWeddingChange}
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
                  value={weddingForm.badamKg}
                  onChange={handleWeddingChange}
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
                  value={weddingForm.kajuKg}
                  onChange={handleWeddingChange}
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
                  value={weddingForm.pistaKg}
                  onChange={handleWeddingChange}
                  placeholder="e.g. 4"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Any notes (packing, budget, etc.)
                <textarea
                  name="notes"
                  value={weddingForm.notes}
                  onChange={handleWeddingChange}
                  placeholder="Share any special requirements"
                  rows={3}
                />
              </label>
            </div>

            {weddingStatus.message && (
              <div className={`status-message ${weddingStatus.type}`}>{weddingStatus.message}</div>
            )}

            <button className="submit-button" type="submit" disabled={weddingSubmitting}>
              {weddingSubmitting ? "Placing Wedding Order..." : "Submit Wedding Order"}
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

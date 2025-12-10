// src/pages/HomeUsePage.jsx
import { useState } from "react";
import { submitOrder } from "../utils/submitOrder";
import badam from "../assets/badambundle.png";
import cashew from "../assets/kajubundle.png";
import pista from "../assets/pistabundle.png";

const HOME_FRUITS = [
  { id: "cashew", label: "Cashew", displayName: "Cashew", image:  cashew},
  { id: "almond", label: "Almond", displayName: "Almond", image: badam },
  { id: "pista", label: "Pista", displayName: "Pista", image: pista },
  // { id: "raisin", label: "Raisin", displayName: "Raisin", image: "/icons/raisin.png" },
  // { id: "walnut", label: "Walnut", displayName: "Walnut", image: "/icons/walnut.png" },
  // { id: "makhana", label: "Makhana", displayName: "Makhana", image: "/icons/makhana.png" },
];

export function HomeUsePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [selectedFruit, setSelectedFruit] = useState(HOME_FRUITS[0]);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 50) return 50;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      setStatus({ type: "error", message: "Please fill name, phone and address." });
      return;
    }

    if (!selectedFruit) {
      setStatus({ type: "error", message: "Please select a dry fruit." });
      return;
    }

    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      orderType: "retail",
      items: [
        {
          product: selectedFruit.displayName,
          quantityKg: quantity,
        },
      ],
      // keep old fields as fallback for backend
      product: selectedFruit.displayName,
      quantity: String(quantity),
    };

    await submitOrder(payload, setStatus, setIsSubmitting, () => {
      setForm({
        name: "",
        phone: "",
        address: "",
      });
      setSelectedFruit(HOME_FRUITS[0]);
      setQuantity(1);
    });
  };

  return (
    <div className="home-use-page">
      {/* Top banner */}
      <div className="home-banner">
        <span className="home-banner-icon">🚚</span>
        <span>Get Delivery in 1 Hour in Your Area</span>
      </div>

      {/* Card */}
      <section className="home-card">
        <h1 className="home-card-title">Home Use Order</h1>
        <p className="home-card-subtitle">
          Fresh Dry Fruits – Order for Home or Gifting.
        </p>

        <form onSubmit={handleSubmit}>
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

          {/* Select Dry Fruit tiles */}
          <div className="form-row">
            <label className="label-with-space">Select Dry Fruit</label>
            <div className="fruit-grid">
              {HOME_FRUITS.map((fruit) => {
                const isSelected = selectedFruit?.id === fruit.id;
                return (
                  <button
                    key={fruit.id}
                    type="button"
                    className={`fruit-tile ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedFruit(fruit)}
                  >
                    {fruit.image && (
                      <img
                        src={fruit.image}
                        alt={fruit.displayName}
                        className="fruit-tile-image"
                      />
                    )}
                    <span className="fruit-tile-name">{fruit.displayName}</span>
                    {isSelected && <span className="fruit-tile-selected">Selected</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity stepper */}
          <div className="form-row">
            <label className="label-with-space">Quantity (in kg)</label>
            <div className="quantity-row">
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleQuantityChange(-1)}
              >
                −
              </button>
              <div className="qty-value">{quantity}</div>
              <button
                type="button"
                className="qty-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {status.message && (
            <div className={`status-message ${status.type}`}>{status.message}</div>
          )}

          <button className="submit-button home-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </section>
    </div>
  );
}

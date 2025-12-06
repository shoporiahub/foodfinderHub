// src/pages/HomeUsePage.jsx
import { useState } from "react";
import { PRODUCTS } from "../config";
import { submitOrder } from "../utils/submitOrder";

export function HomeUsePage() {
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

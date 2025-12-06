// src/pages/WeddingPage.jsx
import { useState } from "react";
import { submitOrder } from "../utils/submitOrder";

export function WeddingPage() {
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

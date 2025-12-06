// src/pages/ShopkeeperPage.jsx
import { useState } from "react";
import { submitOrder } from "../utils/submitOrder";

export function ShopkeeperPage() {
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

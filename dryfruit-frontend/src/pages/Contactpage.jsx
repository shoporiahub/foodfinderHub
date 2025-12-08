// src/pages/ContactPage.jsx
import { useState } from "react";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setStatus("Please fill all required fields.");
      return;
    }

    // right now just show a thank-you message
    setStatus("Thank you! We have received your message and will contact you soon.");
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="content-page">
      <h1>Contact Us</h1>
      <p className="last-updated">
        Have a question about home orders, bulk orders, or wedding dry fruits? Reach out to us.
      </p>

      <div className="contact-layout">
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Your Name *
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
              Phone Number *
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
              Email (optional)
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              How can we help you? *
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your requirement (home, shop, wedding, etc.)"
                rows={4}
              />
            </label>
          </div>

          {status && <div className="status-message success">{status}</div>}

          <button className="submit-button" type="submit">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <h2>Reach us directly</h2>
          <p>
            📞 <strong>9289116043</strong>
          </p>
          <p>
            📧 <strong>shophoriahub@example.com</strong>
          </p>
          <p>
            🏬 <strong>Patna/Bihar</strong>
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            We usually respond within a few hours. For urgent bulk or wedding orders, it&apos;s best
            to call or WhatsApp directly.
          </p>
        </div>
      </div>
    </section>
  );
}

// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { PRODUCTS } from "../config";

export function LandingPage() {
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

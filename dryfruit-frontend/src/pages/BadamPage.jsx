// src/pages/BadamPage.jsx
import { Link } from "react-router-dom";
import { PRODUCTS } from "../config";

export function BadamPage() {
  const badam = PRODUCTS.find((p) => p.id === "badam");

  if (!badam) return null;

  return (
    <section className="product-detail">
      <div className="product-detail-content">
        <h1>{badam.name}</h1>
        <p className="product-price">{badam.pricePerKg}</p>
        <p>{badam.description}</p>
        {badam.longDescription && <p className="product-detail-text">{badam.longDescription}</p>}

        <div className="product-detail-cta">
          <Link to="/home-use" className="small-button">
            Order for Home
          </Link>
          <Link to="/shopkeeper" className="small-outline-button">
            Bulk Order for Shop
          </Link>
          <Link to="/wedding" className="small-outline-button">
            Use for Wedding
          </Link>
        </div>
      </div>

      <div className="product-detail-image-wrapper">
        <img src={badam.image} alt={badam.name} className="product-detail-image" />
      </div>
    </section>
  );
}

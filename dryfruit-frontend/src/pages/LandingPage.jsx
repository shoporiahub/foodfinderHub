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
            Fresh kaju, badam, pista and more – order for home use, your shop, or bulk wedding
            requirements.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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

      <section className="products-wide">

        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-row">
            <div className="product-row-text">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {product.longDescription && (
                <p className="product-long-description">{product.longDescription}</p>
              )}
              <div className="product-cta">
                <Link to={`/${product.id}`} className="small-button">
                  View Details
                </Link>
                <Link to="/home-use" className="small-outline-button">
                  Order for Home
                </Link>
              </div>
            </div>

            <div className="product-row-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-row-image"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </section>

    </>
  );
}

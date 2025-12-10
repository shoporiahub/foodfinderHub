// src/pages/PistaPage.jsx
import { Link } from "react-router-dom";
import { PRODUCTS } from "../config";
import ImageCarousel from "../components/ImageCarousal";
export function PistaPage() {
  const pista = PRODUCTS.find((p) => p.id === "pista");

  if (!pista) return null;

  return (
    <section className="product-detail">
      <div className="product-detail-image-wrapper">
              <ImageCarousel images={pista.images} />
            </div>
      <div className="product-detail-content">
        <h1>{pista.name}</h1>
        <p className="product-price">{pista.pricePerKg}</p>
        <p>{pista.description}</p>
        {pista.longDescription && <p className="product-detail-text">{pista.longDescription}</p>}

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

    </section>
  );
}

// src/pages/KajuPage.jsx
import { Link } from "react-router-dom";
import { PRODUCTS } from "../config";
import ImageCarousel from "../components/ImageCarousal";

export function KajuPage() {
  const kaju = PRODUCTS.find((p) => p.id === "kaju");

  if (!kaju) return null;

  return (
    <section className="product-detail">
      <div className="product-detail-image-wrapper">
        <ImageCarousel images={kaju.images} />
      </div>
      <div className="product-detail-content">
        <h1>{kaju.name}</h1>
        <p className="product-price">{kaju.pricePerKg}</p>
        <p>{kaju.description}</p>
        {kaju.longDescription && <p className="product-detail-text">{kaju.longDescription}</p>}

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

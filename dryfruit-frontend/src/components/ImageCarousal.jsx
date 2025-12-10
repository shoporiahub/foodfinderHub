// src/components/ImageCarousel.jsx
import { useState } from "react";

export default function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  if (!images.length) return null;

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <img src={images[index]} alt="Product" className="carousel-image" />

        <button className="carousel-btn left" onClick={prev}>
          ❮
        </button>
        <button className="carousel-btn right" onClick={next}>
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <div
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

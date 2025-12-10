// src/config.js
import kaju from "../src/assets/kaju.png";
import badam from "../src/assets/badam.png";
import pista from "../src/assets/pista.png";
// src/config.js
export const PRODUCTS = [
  {
    id: "kaju",
    name: "Kaju (Cashew)",
    description: "Rich, creamy cashews – perfect for snacking and sweets.",
    longDescription:
      "Our premium kaju is carefully selected, sorted and packed fresh. Ideal for daily eating, festive gifting and making dishes like kaju katli.",
    image: kaju,
    images: [kaju, badam, pista],
    pricePerKg: "₹900 / kg",
  },
  {
    id: "badam",
    name: "Badam (Almonds)",
    description: "Light, crunchy almonds with amazing nutritional value.",
    longDescription:
      "We source high-quality almonds that are perfect for soaking overnight, roasting, or adding to milk and desserts. Great choice for a healthy lifestyle.",
    image: badam,
    images: [badam, kaju, pista],
    pricePerKg: "₹800 / kg",
  },
  {
    id: "pista",
    name: "Pista (Pistachios)",
    description: "Crunchy, flavourful pistachios – a true snack luxury.",
    longDescription:
      "These pistachios are great for snacking, ice cream toppings, sweets and garnishing. A favourite option for wedding hampers and gifting.",
    image: pista,
    images: [pista, kaju, badam],

    pricePerKg: "₹1,200 / kg",
  },
];

export const LOOP_TEXTS = [
  "Fresh Dry Fruits Delivered Fast",
  "Get Delivery in 1 Hour in Your Area",
  "Order for Home, Shop & Weddings",
];



export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

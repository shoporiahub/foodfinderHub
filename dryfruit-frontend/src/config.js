// src/config.js
export const PRODUCTS = [
  { id: "cashew", name: "Cashew (Kaju)", description: "Premium whole cashew nuts." },
  { id: "badam", name: "Badam (Almonds)", description: "High-quality California almonds." },
  { id: "kaju", name: "Kaju", description: "Roasted kaju with rich taste." },
  { id: "pista", name: "Pista", description: "Crunchy salted pistachios." },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

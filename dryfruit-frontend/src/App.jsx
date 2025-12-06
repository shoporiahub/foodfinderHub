// src/App.jsx
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

import { LandingPage } from "./pages/LandingPage";
import { HomeUsePage } from "./pages/HomeUsePage";
import { ShopkeeperPage } from "./pages/ShopkeeperPage";
import { WeddingPage } from "./pages/WeddingPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";

function App() {
  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Fresh Dry Fruits
          </Link>
        </div>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/home-use">Home Use</NavLink>
          <NavLink to="/shopkeeper">Shopkeeper</NavLink>
          <NavLink to="/wedding">Wedding</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home-use" element={<HomeUsePage />} />
          <Route path="/shopkeeper" element={<ShopkeeperPage />} />
          <Route path="/wedding" element={<WeddingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/terms">Terms &amp; Conditions</Link>
          <span>•</span>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div>© {new Date().getFullYear()} Fresh Dry Fruits. All rights reserved.</div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;

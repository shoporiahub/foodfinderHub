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
import { ContactPage } from "./pages/Contactpage";
import { KajuPage } from "./pages/KajuPage";
import { BadamPage } from "./pages/BadamPage";
import { PistaPage } from "./pages/PistaPage";
import wellnours from "./assets/wellnours.png";

function App() {
  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">
          <NavLink to="/" end className="nav-icon-link">
            <img src={wellnours} alt="Home" className="nav-icon" />
          </NavLink>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Wellnours
          </Link>
          
        </div>
        <nav className="nav-right">

          <NavLink to="/contact">
            Contact
          </NavLink>
        </nav>

        {/* <NavLink to="/shopkeeper">
            Shopkeeper
          </NavLink>
          <NavLink to="/wedding">
            Wedding
          </NavLink> */}

      </header>


      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home-use" element={<HomeUsePage />} />
          <Route path="/shopkeeper" element={<ShopkeeperPage />} />
          <Route path="/wedding" element={<WeddingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/kaju" element={<KajuPage />} />
          <Route path="/badam" element={<BadamPage />} />
          <Route path="/pista" element={<PistaPage />} />
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

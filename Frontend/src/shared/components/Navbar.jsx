import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/navbar.scss"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <span className="navbar__logo-icon">◈</span>
          <h1 className="navbar__logo-text">
            Vibe<span>Sync</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="navbar__links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/scan" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
              Scan
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "navbar__link active" : "navbar__link"}>
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Hamburger (Mobile) */}
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        <ul>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/scan" onClick={() => setMenuOpen(false)}>Scan</NavLink></li>
          <li><NavLink to="/history" onClick={() => setMenuOpen(false)}>History</NavLink></li>
          <li><NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

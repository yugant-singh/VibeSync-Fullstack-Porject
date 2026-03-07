import React, { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from '../../features/auth/hooks/useAuth'
import "../components/navbar.scss"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


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

        {/* Avatar + Dropdown */}
        <div ref={dropdownRef} className="navbar__avatar"
          onClick={() => setDropdownOpen(!dropdownOpen)}>

          {/* User ka pehla letter */}
          <span className="navbar__avatar-letter">
            {user?.name?.charAt(0).toUpperCase()}
          </span>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="navbar__dropdown">
              <p className="navbar__dropdown-name">{user?.name}</p>
              <hr />
              <button onClick={() => navigate('/profile')}>
                👤 Profile
              </button>
              <button onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg> Logout
              </button>
            </div>
          )}

        </div>

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
        <div className="navbar__mobile-user">
          <span className="navbar__mobile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
          <p>{user?.name}</p>
      <button onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg> Logout
              </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

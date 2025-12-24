import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/" className="brand">
       🩺 MediScan <span>AI</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        {/* <NavLink to="/login">Login</NavLink> */}
      </nav>

      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {open && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/upload" onClick={() => setOpen(false)}>Upload</NavLink>
          <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
        </div>
      )}
    </header>
  );
}

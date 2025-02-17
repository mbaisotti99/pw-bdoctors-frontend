// DATA
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/medici" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-magnifying-glass"></i> Ricerca Avanzata
          </NavLink>
        </li>
        <li>
          <NavLink to="/registrati" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-user-doctor"></i> Registrazione Medico
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const NavBar = () => {
    // Stato per gestire l'apertura/chiusura del menu su mobile
    const [isOpen, setIsOpen] = useState(false);

    // Otteniamo il percorso attuale per evidenziare il link attivo
    const location = useLocation();

    // Array di voci di menu per rendere la navbar più espandibile
    const navLinks = [
        { path: "/", label: "Home", icon: "bi-house" },
        { path: "/doctors", label: "Dottori", icon: "bi-person-lines-fill" },
        { path: "/search", label: "Cerca", icon: "bi-search" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo del sito */}
                <NavLink className="navbar-brand" to="/">
                    BDoctors
                </NavLink>

                {/* Bottone per mobile (hamburger menu) */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenitore dei link di navigazione */}
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navLinks.map((link, index) => (
                            <li key={index} className="nav-item">
                                <NavLink
                                    className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                                    to={link.path}
                                >
                                    <i className={`bi ${link.icon} me-1`}></i> {/* Icona accanto al testo */}
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

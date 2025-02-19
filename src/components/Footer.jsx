import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <footer className="py-4 mt-3">
            <div className="container text-center">
                <div className="row justify-content-center mb-3">

                    {/* Sezione informazioni */}
                    <div className="col-md-6 mb-3">
                        <h5>BDoctors</h5>
                        <p>Trova il miglior specialista per le tue esigenze in pochi <Link className="footer-link" to="/medici">click</Link>.</p>
                    </div>

                    {/* Sezione contatti */}
                    <div className="col-md-6 footer-contacts">
                        <h5>Contatti</h5>
                        <a className="" href="mailto:support@bdoctors.com">support@bdoctors.com</a>
                        <a href="tel:+391234567890">+39 123 456 7890</a> 
                    </div>
                </div>

                {/* Copyright */}
                <div className="copyright">
                    <img className="mb-2" width="50" src={`${backendUrl}/images/bdoctors-logo-senza-testo.png`} alt="BDoctors Logo" />
                    <p className="small">&copy; {new Date().getFullYear()} BDoctors. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
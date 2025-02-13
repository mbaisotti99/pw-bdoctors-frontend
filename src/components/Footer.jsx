import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-2 mt-5">
            <div className="container text-center">
                <div className="row justify-content-center">
                    {/* Sezione informazioni */}
                    <div className="col-md-6 mb-3">
                        <h5>BDoctors</h5>
                        <p>Trova il miglior specialista per le tue esigenze in pochi click.</p>
                    </div>

                    {/* Sezione contatti */}
                    <div className="col-md-6 mb-3">
                        <h5>Contatti</h5>
                        <p>Email: support@bdoctors.com</p>
                        <p>Telefono: +39 123 456 7890</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-3">
                    <p className="small mb-0">&copy; {new Date().getFullYear()} BDoctors. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
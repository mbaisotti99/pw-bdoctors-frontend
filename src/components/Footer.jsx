import React from "react";

const Footer = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return (
        <footer className="py-2 mt-5">
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
                    <img className="mb-2" width="50" src={`${backendUrl}/images/bdoctors-logo-senza-testo.png`} alt="BDoctors Logo" />
                    <p className="small mb-0">&copy; {new Date().getFullYear()} BDoctors. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
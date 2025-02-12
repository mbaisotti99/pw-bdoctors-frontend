import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="container mt-4">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1>Trova il medico giusto per te</h1>
                <p>Cerca per specializzazione, città o recensioni</p>
                <div className="d-flex justify-content-center gap-3">
                    <NavLink className="btn btn-primary" to="/medici">
                        🔍 Cerca un medico
                    </NavLink>
                    <NavLink className="btn btn-outline-primary" to="/registrati">
                        👨‍⚕️ Registrati come medico
                    </NavLink>
                </div>
            </div>

            {/* Medici in Evidenza */}
            <section className="mb-5">
                <h2>Medici in evidenza</h2>
                <p>Qui verranno mostrati alcuni medici consigliati</p>
                {/* Da sostituire con il componente dinamico */}
                <div className="alert alert-info">Qui verranno caricati i medici più votati</div>
            </section>

            {/* Sezione Filtri (Placeholder) */}
            <section className="mb-5">
                <h2>Filtra per specializzazione, città o voti</h2>
                {/* Da sostituire con il componente dei filtri */}
                <div className="alert alert-warning">I filtri verranno integrati qui</div>
            </section>

            {/* Recensioni degli Utenti */}
            <section className="mb-5">
                <h2>Recensioni recenti</h2>
                <p>Qui verranno mostrate alcune recensioni degli utenti</p>
                {/* Da sostituire con il componente delle recensioni */}
                <div className="alert alert-info">Le ultime recensioni verranno mostrate qui</div>
            </section>
        </div>
    );
};

export default HomePage;
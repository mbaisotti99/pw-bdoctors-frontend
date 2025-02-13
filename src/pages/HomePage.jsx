import React from "react";
import { Link } from "react-router-dom";
import TopDoctors from "../components/TopDoctors";
import LatestReviews from "../components/LatestReviews";
import SearchFilter from "../components/SearchFilter"

const HomePage = () => {
    return (
        <div className="container mt-4">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1>Trova il medico giusto per te</h1>
                <p>Cerca per specializzazione, città o recensioni</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link className="btn btn-primary" to="/medici">
                        🔍 Cerca un medico
                    </Link>
                    <Link className="btn btn-outline-primary" to="/registrati">
                        👨‍⚕️ Registrati come medico
                    </Link>
                </div>
            </div>

            {/* Medici in Evidenza */}
            <section className="mb-5">
                <h2 className="mb-3">Medici in evidenza</h2>
                <TopDoctors />
            </section>

            {/* Sezione Filtri (Placeholder) */}
            <section className="mb-5">
                <h2 className="mb-3">Filtra per specializzazione o città</h2>
                {/* Da sostituire con il componente dei filtri */}
                <SearchFilter />
            </section>

            {/* Recensioni degli Utenti */}
            <section className="mb-5">
                <h2 className="mb-3">Recensioni recenti</h2>
                <LatestReviews />
            </section>
        </div>
    );
};

export default HomePage;
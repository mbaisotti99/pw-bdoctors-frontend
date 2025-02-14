import React from "react";
import { Link } from "react-router-dom";
import TopDoctors from "../components/TopDoctors";
import LatestReviews from "../components/LatestReviews";
import SearchFilter from "../components/SearchFilter";

const HomePage = () => {
    return (
        <div className="container mt-4">
            {/* Sezione Filtri - Ora in cima */}
            <section className="mb-4">
                <h2 className="mb-3">Trova il  tuo specialista!</h2>
                <SearchFilter />
            </section>

            {/* Medici in Evidenza */}
            <section className="mb-5">
                <h2 className="mb-3">Medici in evidenza</h2>
                <TopDoctors />
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
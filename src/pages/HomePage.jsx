import React from "react";
import '../styles/HomePage.css';
import TopDoctors from "../components/TopDoctors";
import LatestReviews from "../components/LatestReviews";
import SearchFilter from "../components/SearchFilter";

const HomePage = () => {
    return (
        <div className="container mt-4">
            {/* Sezione Filtri - Ora in cima */}
            <section className="mb-4">
                <h2 className="mb-3 find-specialist-title"><i className="fa-solid fa-star-of-life"></i> Trova il tuo specialista</h2>
                <SearchFilter />
            </section>

            {/* Medici in Evidenza */}
            <section className="mb-4">
                <h2 className="mb-3 medici-evidenza-title"><i class="fa-solid fa-heart"></i> Medici in evidenza</h2>
                <TopDoctors />
            </section>

            {/* Recensioni degli Utenti */}
            <section className="mb-1">
                <h2 className="mb-3 latest-reviews-title"><i className="fa-solid fa-comments"></i> Recensioni recenti</h2>
                <LatestReviews />
            </section>
        </div>
    );
};

export default HomePage;
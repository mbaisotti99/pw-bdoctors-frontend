// DATA
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// RENDER TOP DOCTORS
const TopDoctors = () => {

    const [topDoctors, setTopDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const scrollRef = useRef(null);

    useEffect(() => {

        const fetchTopDoctors = async () => {
            try {
                const response = await axios.get(`${backendUrl}/medici/top`);
                setTopDoctors(response.data);
            } catch (error) {
                setError("Errore nel caricamento dei medici in evidenza");
            } finally {
                setLoading(false);
            }
        };

        fetchTopDoctors();

    }, []);

    // EFFETTO SCORRIMENTO AUTOMATICO
    useEffect(() => {

        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollInterval = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
                // AGGIUNGI UNA PAUSA PRIMA DI RESETTARE LO SCROLL
                setTimeout(() => {
                    scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
                }, 1000); // Aspetta 1 secondo prima di tornare all'inizio
            } else {
                scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
            }
        }, 3000);

        // PULISCE INTERVALLO QUANDO IL COMPONENTE VIENE SMONTATO
        return () => clearInterval(scrollInterval);

    }, [topDoctors]);

    // GESTIONE CARICAMENTO
    if (loading) return <div className="alert alert-info">Caricamento medici in evidenza...</div>;

    // GESTIONE ERRORE
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container-fluid top-doc-container">
            <div ref={scrollRef} className="row flex-nowrap overflow-auto py-4">

                {topDoctors.map((doctor) => (
                    <div key={doctor.id} className="col-auto">
                        <div className="top-doc-card d-flex flex-column">
                            <div>
                                <h5 className="top-doc-name mb-3">
                                    {doctor.nome} {doctor.cognome}
                                </h5>
                            </div>
                            <div className="top-doc-middle">
                                <div className="top-doc-img-container">
                                    <img
                                        src={`${backendUrl}/images/${doctor.immagine}`}
                                        className="top-doc-img"
                                        alt={`Dr. ${doctor.cognome}`}
                                    />
                                </div>
                                <div className="top-doc-text">

                                    <Link to={`/medici?specializzazione=${doctor.nome_specializzazione}`} className="top-doc-spec mb-2">
                                        {doctor.nome_specializzazione} <i className="fa-solid fa-user-graduate"></i>
                                    </Link>

                                    <p className="top-doc-city mb-4">
                                        {doctor.citta} <i className="fa-solid fa-location-dot"></i>
                                    </p>

                                    <p className="top-doc-vote">
                                        {doctor.media_voti} <i className="fa-solid fa-star"></i> <br /> <small>({doctor.numero_recensioni} recensioni)</small>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Link to={`/medici/${doctor.slug}`} className="top-doc-btn">
                                    Vedi Profilo <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

// EXPORT
export default TopDoctors;
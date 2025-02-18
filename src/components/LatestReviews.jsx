// DATA
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// RENDER LATEST REVIEWS
const LatestReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${backendUrl}/medici/recensioni/recenti`);
                setReviews(response.data);
            } catch (error) {
                setError("Errore nel caricamento delle recensioni");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();

    }, []);

    // GESTIONE CARICAMENTO
    if (loading) return <div className="alert alert-info">Caricamento recensioni...</div>;

    // GESTIONE ERRORE
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (

        <div className="row row-cols-1 row-cols-md-2 g-4">

            {reviews.map((review) => (
                <div key={review.id} className="col">
                    <div className="latest-review-card">
                        <div className="card-body">
                            <div className="d-flex latest-review-top justify-content-between align-items-center">

                                <div className="latest-review-image-container">
                                    <img
                                        src={`${backendUrl}/images/${review.immagine_medico}`}
                                        className="latest-review-image"
                                        alt={`Dr. ${review.cognome_medico}`}
                                    />
                                </div>

                                <div className="latest-review-info">
                                    <h5 className="latest-review-title mb-1">
                                        {review.nome_medico} {review.cognome_medico}
                                    </h5>
                                    <h6 className="latest-review-subtitle mb-1">
                                        {review.nome_specializzazione}
                                    </h6>

                                    <Link to={`/medici/${review.medico_slug}`} className="latest-review-btn">
                                        Vedi Profilo <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>

                            </div>

                            <p className="card-text">
                                {review.recensione}
                            </p>

                            <div className="latest-review-footer d-flex justify-content-between align-items-center">

                                <small className="review-author">
                                    Recensito da: {review.nome_utente}
                                </small>

                                <span className="vote-badge">
                                    {review.voto} <i className="fa-solid fa-star"></i>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>

    );

};

// EXPORT
export default LatestReviews;
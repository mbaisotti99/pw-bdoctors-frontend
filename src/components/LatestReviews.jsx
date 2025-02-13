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
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">

                                <h5 className="card-title mb-0">
                                   {review.nome_medico} {review.cognome_medico}
                                </h5>

                                <span className="badge bg-primary">
                                    {review.voto} ⭐
                                </span>

                            </div>

                            <h6 className="card-subtitle mb-2 text-muted">
                                {review.nome_specializzazione}
                            </h6>

                            <p className="card-text">
                                {review.recensione}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">

                                <small className="text-muted">
                                    Recensito da: {review.nome_utente}
                                </small>

                                <Link to={`/medici/${review.medico_slug}`} className="btn btn-sm btn-outline-primary">
                                    Vedi Profilo
                                </Link>

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
// DATA
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// RENDER TOP DOCTORS
const TopDoctors = () => {
    const [topDoctors, setTopDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

    // GESTIONE CARICAMENTO
    if (loading) return <div className="alert alert-info">Caricamento medici in evidenza...</div>;
    
    // GESTIONE ERRORE
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (

        <div className="container-fluid">

            <div className="row flex-nowrap overflow-auto pb-3">

                {topDoctors.map((doctor) => (
                    <div key={doctor.id} className="col-auto">

                        <div className="card d-flex flex-row align-items-center shadow-sm">

                            <img 
                                src={`${backendUrl}/images/${doctor.immagine}`} 
                                className="rounded-start"
                                alt={`Dr. ${doctor.cognome}`}
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />

                            <div className="card-body">

                                <h5 className="card-title mb-1">{doctor.nome} {doctor.cognome}</h5>

                                <p className="card-text small mb-1">
                                    <strong>Specializzazione:</strong> {doctor.nome_specializzazione}
                                </p>

                                <p className="card-text small mb-2">
                                    <strong>Voto medio:</strong> {doctor.media_voti} ⭐ ({doctor.numero_recensioni} recensioni)
                                </p>

                                <Link to={`/medici/${doctor.slug}`} className="btn btn-sm btn-primary">
                                    Vedi Profilo
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
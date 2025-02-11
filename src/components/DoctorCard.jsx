import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
    const { nome, cognome, specializzazione, citta, immagine, slug } = doctor;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="card h-100 ">
            <div className="card-header p-0">
                <img 
                    src={`${backendUrl}/images/${immagine}`}
                    className="card-img-top"
                    alt={`Dr. ${cognome}`}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">Dr. {nome} {cognome}</h5>
                <div className="mb-2">
                    <span className="badge bg-primary">{specializzazione}</span>
                </div>
                <p className="card-text">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {citta}
                </p>
            </div>
            <div className="card-footer bg-white border-0">
                <Link 
                    to={`/medici/${slug}`}
                    className="btn btn-outline-primary w-100"
                >
                    Vedi Profilo
                </Link>
            </div>
        </div>
    );
};

export default DoctorCard;
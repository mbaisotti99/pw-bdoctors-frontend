// DATA
import { Link } from "react-router-dom";

// CARD RENDER
const DoctorCard = ({ doctor }) => {
    console.log(doctor)

    const { nome, cognome, email, indirizzo, telefono, specializzazione, citta, immagine, slug } = doctor;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="doc-list-card h-100">

            {/* Immagine */}
            <div className="doc-list-header">
                <img
                    src={`${backendUrl}/images/${immagine}`}
                    className="doc-list-img"
                    alt={`Dr. ${cognome}`}
                />
            </div>

            {/* Contenuto Card */}
            <div className="card-body">

                {/* Titolo Card */}
                <h5 className="doc-list-title">{nome} {cognome}</h5>

                {/* Specializzazione */}
                <div className="mb-3">
                    <span className="spec-badge">{specializzazione}</span>
                </div>

                {/* Contatti */}
                <div className="doc-list-text">

                    {/* Telefono */}
                    <div className="doc-list-contact">
                        <i className="fa-solid fa-phone"></i>
                        <a
                            href={`tel:{telefono}`}
                            className="phone-btn"
                        >
                            {telefono}
                        </a>
                    </div>

                    {/* Email */}
                    <div className="doc-list-contact">
                        <i className="fa-solid fa-envelope"></i>
                        <a
                            className="email"
                            href={`mailto:{email}`}
                        >
                            {email}
                        </a>
                    </div>

                    {/* Luogo */}
                    <div className="doc-list-contact">
                        <i className="fa-solid fa-map-location-dot"></i>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${indirizzo} ${citta}`)}`}
                            className="address-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Apri ${indirizzo} ${citta} su Google Maps`}
                        >
                            {indirizzo} - {citta}
                        </a>
                    </div>

                </div>
            </div>

            {/* Footer Card */}
            <div className="card-footer">

                {/* Pulsante Vedi Profilo */}
                <Link
                    to={`/medici/${slug}`}
                    className="profile-btn"
                >
                    Vedi Profilo
                </Link>

            </div>
        </div>
    );
};

// EXPORT
export default DoctorCard;
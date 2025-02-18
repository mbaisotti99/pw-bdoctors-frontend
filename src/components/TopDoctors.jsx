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
    
        let animationFrameId;
        let scrollPosition = 0;
        const scrollSpeed = 0.3;
        let isPaused = false;
        let isTouching = false;
    
        // ANIMAZIONE SCORRIMENTO
        const animate = () => {
            if (!isPaused && !isTouching) {
                scrollPosition += scrollSpeed;
                
                if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = 0;
                    scrollPosition = 0;
                } else {
                    scrollContainer.scrollLeft = scrollPosition;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };
    
        // EVENT HANDLERS DEL MOUSE
        const handleMouseEnter = () => {
            isPaused = true;
        };
        
        const handleMouseLeave = () => {
            isPaused = false;
            scrollPosition = scrollContainer.scrollLeft;
        };
    
        // EVENT HANDLERS DEL TOUCH
        const handleTouchStart = () => {
            isTouching = true;
        };
    
        const handleTouchEnd = () => {
            isTouching = false;
            scrollPosition = scrollContainer.scrollLeft;
        };
    
        // AGGIUNGI EVENT LISTENERS
        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);
        scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // INIZIA ANIMAZIONE
        animationFrameId = requestAnimationFrame(animate);
    
        // PULIZIA 
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            scrollContainer.removeEventListener('touchstart', handleTouchStart);
            scrollContainer.removeEventListener('touchend', handleTouchEnd);
        };
    }, [topDoctors]);

    // GESTIONE CARICAMENTO
    if (loading) return <div className="alert alert-info">Caricamento medici in evidenza...</div>;

    // GESTIONE ERRORE
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div 
            className="container-fluid top-doc-container"
            aria-label="Medici in evidenza"
        >
            <div 
                ref={scrollRef} 
                className="row flex-nowrap overflow-auto py-4"
                role="region"
                aria-label="Slider dei medici in evidenza"
            >

                {topDoctors.map((doctor) => (
                    <div key={doctor.id} className="col-auto">
                        <div className="top-doc-card d-flex flex-column">
                            <div>
                                <h5 className="top-doc-name mb-0">
                                    {doctor.nome} {doctor.cognome}
                                </h5>
                            </div>
                            <div className="top-doc-middle">
                                <div className="top-doc-img-container">
                                    <img
                                        src={`${backendUrl}/images/${doctor.immagine}`}
                                        className="top-doc-img"
                                        alt={`Foto del Dottor ${doctor.nome} ${doctor.cognome}`}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="top-doc-text">

                                    <Link to={`/medici?specializzazione=${doctor.nome_specializzazione}`} className="top-doc-spec mb-2">
                                        {doctor.nome_specializzazione} <i className="fa-solid fa-user-graduate"></i>
                                    </Link>

                                    <p className="top-doc-city">
                                        {doctor.citta} <i className="fa-solid fa-location-dot"></i>
                                    </p>

                                    <div className="top-doc-vote">
                                        <div className="top-doc-badge">
                                            {doctor.media_voti} <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div>
                                            <small>({doctor.numero_recensioni} recensioni)</small>
                                        </div>                                       
                                    </div>
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
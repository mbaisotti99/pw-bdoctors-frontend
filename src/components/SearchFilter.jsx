// DATA
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// RENDER SEARCH FILTER
const SearchFilter = () => {

    const navigate = useNavigate();
    const [specializzazioni, setSpecializzazioni] = useState([]);
    const [filters, setFilters] = useState({
        specializzazione: ""
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // CARICA SPECIALIZZAZIONI
    useEffect(() => {

        const fetchData = async () => {

            try {
                const specResponse = await axios.get(`${backendUrl}/medici/specializzazioni`);
                // SORT SPECIALIZZAZIONI ALFABETICAMENTE PER NOME SPECIALIZZAZIONE (IT) 
                const sortedSpecializations = specResponse.data.sort((a, b) => 
                    a.nome_specializzazione.localeCompare(b.nome_specializzazione, 'it', { sensitivity: 'base' })
                );
                setSpecializzazioni(sortedSpecializations);
            } catch (error) {
                console.error("Errore nel caricamento dei filtri:", error);
            }

        };

        fetchData();

    }, [backendUrl]);

    // GESTISCE CAMBIO FILTRO
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // GESTISCE INVIO
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // COSTRUISCE QUERY PARAMETRI SELEZIONATI
        const params = new URLSearchParams();
        if (filters.specializzazione) {
            params.append('specializzazione', filters.specializzazione);
        }

        // NAVIGA ALLA PAGINA DI RICERCA CON I FILTRI
        navigate(`/medici?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="filter-card p-3">
            <div className="row g-3">
                <div className="col-md-10">
                    <select
                        className="form-select"
                        name="specializzazione"
                        value={filters.specializzazione}
                        onChange={handleChange}
                    >
                        <option value="">Seleziona una specializzazione</option>
                        {specializzazioni.map((spec) => (
                            <option key={spec.id} value={spec.nome_specializzazione}>
                                {spec.nome_specializzazione}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <button 
                        type="submit" 
                        className="search-btn"
                        disabled={!filters.specializzazione}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i> Cerca
                    </button>
                </div>
            </div>
        </form>
    );
};

// EXPORT
export default SearchFilter;
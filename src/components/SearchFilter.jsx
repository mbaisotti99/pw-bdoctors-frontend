// DATA
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// RENDER SEARCH FILTER
const SearchFilter = () => {

    const navigate = useNavigate();
    const [specializzazioni, setSpecializzazioni] = useState([]);
    const [cities, setCities] = useState([]);
    const [filters, setFilters] = useState({
        specializzazione: "",
        citta: ""
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // CARICA SPECIALIZZAZIONI E CITTA 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [specResponse, citiesResponse] = await Promise.all([
                    axios.get(`${backendUrl}/medici/specializzazioni`),
                    axios.get(`${backendUrl}/medici/citta`)
                ]);
                setSpecializzazioni(specResponse.data);
                setCities(citiesResponse.data);
            } catch (error) {
                console.error("Errore nel caricamento dei filtri:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // COSTRUISCE QUERY PARAMETRI SELEZIONATI
        const params = new URLSearchParams();
        if (filters.specializzazione) {
            params.append('specializzazione', filters.specializzazione);
        }
        if (filters.citta) {
            params.append('citta', filters.citta);
        }

        // NAVIGA ALLA PAGINA DI RICERCA CON I FILTRI
        navigate(`/medici?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4">
            <div className="row g-3">
                <div className="col-md-5">
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
                        className="btn btn-primary w-100"
                        disabled={!filters.specializzazione && !filters.citta}
                    >
                        🔍 Cerca
                    </button>
                </div>
            </div>
        </form>
    );
};

// EXPORT
export default SearchFilter;
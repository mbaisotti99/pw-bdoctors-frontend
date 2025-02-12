import { useState } from "react";

const FilterButtons = ({ onFilterChange }) => {
    // Stato per i filtri selezionati
    const [filters, setFilters] = useState({
        specialization: "",
        city: "",
        rating: ""
    });

    // Opzioni prese dal database
    const specializations = [
        "Cardiologia", "Dermatologia", "Ortopedia", "Pediatria", "Neurologia",
        "Ginecologia", "Urologia", "Oculistica", "Psichiatria", "Endocrinologia",
        "Chirurgia Generale", "Oncologia", "Radiologia", "Medicina Interna", "Medicina d'Urgenza"
    ];

    const cities = [
        "Milano", "Roma", "Napoli", "Torino", "Firenze", "Bologna", "Palermo", "Genova", "Venezia", "Bari"
    ];

    const ratings = [5, 4, 3, 2, 1];

    // Funzione per aggiornare il filtro selezionato
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
        onFilterChange({ ...filters, [name]: value }); // Passiamo il nuovo valore al componente padre
    };

    return (
        <div className="d-flex gap-2 mb-3">
            {/* Filtro per Specializzazione */}
            <select className="form-select" name="specialization" value={filters.specialization} onChange={handleFilterChange}>
                <option value="">Seleziona Specializzazione</option>
                {specializations.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                ))}
            </select>

            {/* Filtro per Città */}
            <select className="form-select" name="city" value={filters.city} onChange={handleFilterChange}>
                <option value="">Seleziona Città</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}
            </select>

            {/* Filtro per Media Voti */}
            <select className="form-select" name="rating" value={filters.rating} onChange={handleFilterChange}>
                <option value="">Seleziona Media Voti</option>
                {ratings.map((rating, index) => (
                    <option key={index} value={rating}>{rating} ★</option>
                ))}
            </select>
        </div>
    );
};

export default FilterButtons;

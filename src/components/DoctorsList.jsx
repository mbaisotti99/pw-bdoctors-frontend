// DATA
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";

// RENDER DOCTOR LIST
const DoctorList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // RICEVI MEDICI
    const getDoctors = async (params = {}) => {
        try {
            const response = await axios.get(`${backendUrl}/medici`, { params });
            setDoctors(response.data.data);
        } catch (error) {
            console.error("Errore nel caricamento dei medici:", error);
        }
    };

    // CARICA SPECIALIZZAZIONI
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await axios.get(`${backendUrl}/medici`);
                const uniqueSpecializations = [...new Set(response.data.data.map(doc => doc.specializzazione))].sort();
                setSpecializations(uniqueSpecializations);
            } catch (error) {
                console.error("Errore nel caricamento delle specializzazioni:", error);
            }
        };

        fetchSpecializations();
    }, []);

    // GESTISCE PARAMS DAL URL E FA LA RICERCA INIZIALE
    useEffect(() => {
        const specFromUrl = searchParams.get("specializzazione") || "";
        const searchFromUrl = searchParams.get("search") || "";
        setSelectedSpecialization(specFromUrl);
        setSearch(searchFromUrl);
        
        const params = Object.fromEntries(searchParams.entries());
        getDoctors(params);
    }, [searchParams]);

    // UPDATE DEI PARAMETRI DI RICERCA
    const updateSearchParams = (newParams) => {
        setSearchParams((prevParams) => {
            const updatedParams = new URLSearchParams(prevParams);
            Object.keys(newParams).forEach((key) => {
                if (newParams[key]) {
                    updatedParams.set(key, newParams[key]);
                } else {
                    updatedParams.delete(key);
                }
            });
            return updatedParams;
        });
    };

    // GESTIONE SEARCH
    const handleSearch = () => {
        updateSearchParams({ specializzazione: selectedSpecialization, search });
    };

    return (
        <section className="mb-5">
            <h3 className="mb-4">Filtra i nostri Specialisti:</h3>

            <div className="search">
                <div className="filters mb-2">
                    <select
                        value={selectedSpecialization}
                        onChange={(event) => {
                            const value = event.target.value;
                            setSelectedSpecialization(value);
                            updateSearchParams({ specializzazione: value, search });
                        }}
                        className="form-select"
                    >
                        <option value="">Tutte le Specializzazioni</option>
                        {specializations.map((spec, index) => (
                            <option key={index} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="searchbar mb-2">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") handleSearch();
                        }}
                        className="form-control"
                        placeholder="Cerca medico per nome o cognome..."
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="btn btn-primary search-btn mb-5"
                >
                    <i className="fa-solid fa-magnifying-glass"></i> Cerca
                </button>
                <div className="mb-2">
                    Totale medici: {doctors.length}
                </div>
            </div>

            {doctors.length > 0 ? (
                <div className="row g-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
                            <DoctorCard doctor={doctor} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-danger mt-4">
                    Nessun medico trovato. Riprova con un altro filtro.
                </div>
            )}
        </section>
    );
};

// EXPORT
export default DoctorList;

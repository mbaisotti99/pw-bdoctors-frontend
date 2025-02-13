// DATA
import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";

// RENDER DOCTORS LIST
const DoctorList = () => {
    
    const [doctors, setDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // TROVA MEDICI
    const getDoctors = async () => {

        try {
            const params = {};
    
            if (search.length > 0) {
                params.search = search;
            }
    
            if (selectedSpecialization !== "") {
                params.specializzazione = selectedSpecialization;
            }
    
            const response = await axios.get(`${backendUrl}/medici`, { params });
            setDoctors(response.data.data);
        } catch (error) {
            console.error("Errore nel caricamento dei medici:", error);
        }

    };

    // RICERCA CON ENTER
    const handleEnterKey = (event) => {

        if (event.key === "Enter") {
            getDoctors();
        }

    };

    // ESTRAE SPECIALIZZAZIONE
    const extractSpecializations = (doctorsList) => {

        const uniqueSpecializations = [];
        
        doctorsList.forEach((doctor) => {
            if (!uniqueSpecializations.includes(doctor.specializzazione)) {
                uniqueSpecializations.push(doctor.specializzazione);
            }
        });

        setSpecializations(uniqueSpecializations.sort());

    };

    useEffect(() => {

        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${backendUrl}/medici`);
                setDoctors(response.data.data);
                extractSpecializations(response.data.data);
            } catch (error) {
                console.error("Errore nel caricamento iniziale:", error);
            }
        };
    
        fetchDoctors();

    }, []);

    useEffect(() => {
        getDoctors();
    }, [selectedSpecialization]);

    return (
        <>

            <section className="mb-5">
                <h3 className="mb-4">Filtra i nostri Specialisti:</h3>

                {/* SEARCHBAR */}
                <div className="search">

                    <div className="filters mb-2">

                        {/* FILTRO SPECIALIZZAZIONE */}
                        <select
                            value={selectedSpecialization}
                            onChange={(event) => setSelectedSpecialization(event.target.value)}
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
                            onKeyUp={handleEnterKey}
                            className="form-control"
                            placeholder="Cerca medico per nome o cognome..."
                        />
                    </div>
                    <button
                            onClick={getDoctors}
                            className="btn btn-primary search-btn mb-5"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i> Cerca
                    </button>
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
                    <div className="alert alert-danger  mt-4">
                        Nessun medico trovato. Riprova con un altro nome.
                    </div>
                )}
            </section>
            
        </>

    );
    
};

export default DoctorList;
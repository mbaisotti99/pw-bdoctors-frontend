import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getDoctors = () => {
        const params = {};

        if (search.length > 0) {
            params.search = search;
        }

        if (selectedSpecialization !== "") {
            params.specializzazione = selectedSpecialization;
        }

        axios.get(`${backendUrl}/medici`, { params })
            .then((resp) => {
                setDoctors(resp.data.data);
            })
            .catch(error => {
                console.error("Errore nel caricamento dei medici:", error);
            });
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            getDoctors();
        }
    };

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
        // Caricamento iniziale
        axios.get(`${backendUrl}/medici`)
            .then((resp) => {
                setDoctors(resp.data.data);
                extractSpecializations(resp.data.data);
            })
            .catch(error => {
                console.error("Errore nel caricamento iniziale:", error);
            });
    }, []);

    useEffect(() => {
        getDoctors();
    }, [selectedSpecialization]);

    return (
        <>
            <section>
                {doctors.length > 0 ? (
                    <div className="row g-4">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
                                <DoctorCard doctor={doctor} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info text-center mt-4">
                        Nessun medico trovato
                    </div>
                )}
            </section>
        </>
    );
};

export default DoctorList;
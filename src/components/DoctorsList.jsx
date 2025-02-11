import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {

    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios.get(`${backendUrl}/medici`)
            .then((resp) => {
                setDoctors(resp.data.data);
            })
            .catch(error => {
                console.error("Errore nel caricamento iniziale:", error);
            });
    }, []);

    return (
        <>
            <section className="mb-5">
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
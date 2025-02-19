// DATA
import { Link } from "react-router-dom";
import DoctorsList from "../components/DoctorsList";
import '../styles/Doctors.css';

// PAGE RENDER
const Doctors = () => {

    return (

        <div className="container mt-1">
            <section className="doctor-page">
                <div className="doctor-header">
                    <Link
                        to="/"
                        className="home-btn"
                    >
                        <i className="fas fa-arrow-left"></i> Home
                    </Link>

                    {/* TITOLO SEZIONE */}
                    <h1 className="doctor-title">Cerca lo specialista che fa per te</h1> 
                </div>
                

                {/* LISTA MEDICI */}
                <DoctorsList />

            </section>
        </div>

    )

};

// EXPORT
export default Doctors;
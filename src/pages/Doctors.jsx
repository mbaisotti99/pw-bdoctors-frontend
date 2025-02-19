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
                </div>
                
                <h1 className="search-title"><i class="fa-solid fa-magnifying-glass advanced"></i> Cerca il tuo specialista</h1> 
                {/* LISTA MEDICI */}
                <DoctorsList />

            </section>
        </div>

    )

};

// EXPORT
export default Doctors;
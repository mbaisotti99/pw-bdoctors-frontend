// DATA
import { Link } from "react-router-dom";
import DoctorsList from "../components/DoctorsList";
import '../styles/Doctors.css';

// PAGE RENDER
const Doctors = () => {

    return (

        <div className="container mt-4">
            <section className="presentation mb-5">

                <Link
                    to="/"
                    className="home-btn"
                >
                    <i className="fas fa-arrow-left"></i> Home
                </Link>

                {/* TITOLO SEZIONE */}
                <h1 className="my-4">Cerca lo specialista che fa per te!</h1>

                {/* LISTA MEDICI */}
                <DoctorsList />

            </section>
        </div>

    )

};

// EXPORT
export default Doctors;
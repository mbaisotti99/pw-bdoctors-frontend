// DATA
import DoctorsList from "../components/DoctorsList";
import { Link } from "react-router-dom";

// PAGE RENDER
const Doctors = () => {

    return (

        <div className="container mt-4">
            <section className="presentation mb-5">
                
                {/* TITOLO SEZIONE */}
                <h1 className="mb-5">Ecco lo specialista che fa per te!</h1>

                {/* BOTTONE CREA MEDICO */}
                <Link
                    className="create-btn btn btn-primary"
                    to="/medici/registrazione"
                >
                    + Registrati come Medico
                </Link>
            </section>

            {/* LISTA MEDICI */}
            <DoctorsList />
        </div>

    )

};

// EXPORT
export default Doctors;
import DoctorsList from "../components/DoctorsList"
import { Link } from "react-router-dom";

const Doctors = () => {
    return (
        <div className="container">
            <section className="presentation">
                <h1>Trova il tuo Specialista</h1>
                <p>Scopri i migliori medici specialisti nella tua zona</p>
                <Link
                    className="create-btn"
                    to="/medici/registrazione"
                >
                    + Registrati come Medico
                </Link>
            </section>
            <DoctorsList />
        </div>
    )
}

export default Doctors
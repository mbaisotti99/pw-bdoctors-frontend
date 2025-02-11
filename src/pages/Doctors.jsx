// DATA
import DoctorsList from "../components/DoctorsList";

// PAGE RENDER
const Doctors = () => {

    return (

        <div className="container mt-4">
            <section className="presentation mb-5">
                
                {/* TITOLO SEZIONE */}
                <h1 className="mb-5">Cerca lo specialista che fa per te!</h1>

            </section>

            {/* LISTA MEDICI */}
            <DoctorsList />
        </div>

    )

};

// EXPORT
export default Doctors;
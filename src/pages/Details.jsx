import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Details = () => {


    const [reviews, setRev] = useState([])
    const [doctor, setDoc] = useState({})
    const [popup, setPopup] = useState(false)
    const [isErr, setIsErr] = useState(false)

    const { slug } = useParams()

    const [formData, setFormData] = useState({
        subject: "",
        text: "",
    });

    const sendMail = (event) => {
        event.preventDefault()
        setIsErr(false)
        axios
            .post(`http://localhost:3000/medici/${slug}/send-mail`, formData)
            .then((resp) => {
                console.log(resp);
                setPopup(true);
                // (resp.status != 200) && setIsErr(true)
            })
            .catch((err) => {
                setPopup(true);
                setIsErr(true)  
                console.log(err);
                
            })
    }

    const onMailChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const printStars = (vote) => {
        let count = ""
        for (let i = 0; i < vote; i++) {
            count += "⭐"
        }
        return count
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3000/medici/${slug}`)
            .then((resp) => {
                // console.log(resp);
                setDoc(resp.data.data)

            })
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:3000/medici/${slug}/recensioni`)
            .then((resp) => {
                // console.log(resp);
                setRev(resp.data.data)
            })
            
    }, [doctor])



    return (
        <div className="container">
            <div className="detailCard">
                <ul className="details">
                    <li><img src={`http://localhost:3000/images/${doctor.immagine}`} alt={`${doctor.nome} ${doctor.cognome}`} width={350} className="docImg" /></li>
                    <li className="docName">{`${doctor.nome} ${doctor.cognome}`}</li>
                    <li>{doctor.email}</li>
                    <li>{doctor.telefono}</li>
                    <li>{doctor.specializzazione}</li>
                </ul>
            </div>
            <h2 className="text-center mb-5">Recensioni</h2>
            <div className="reviews">
                {reviews.map((curRev, i) => {
                    return (
                        <div className="reviewCard" key={i}>
                            <ul className="rev">
                                <li>{curRev.nome_utente}</li>
                                <li>{printStars(curRev.voto)}</li>
                                <li>{curRev.recensione}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            <h2 className="text-center my-5">Chiedi consulenza</h2>
            <form onSubmit={sendMail}>
                <div className="text-center">
                    <label className="my-3" htmlFor="subject">Soggetto</label>
                    <input
                        className="form-control"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={onMailChange}
                    />
                    <label className="my-3" htmlFor="text">Testo</label>
                    <textarea
                        className="form-control mb-4"
                        name="text"
                        value={formData.text}
                        onChange={onMailChange}
                    />
                    <button type="submit" className="btn btn-primary mb-4">Invia</button>
                </div>
                {popup && (
                    <div className={`alert ${isErr ? ("alert-danger") : ("alert-success")}`}>
                        <p className="fs-4 text-center w-100 m-0">
                            {isErr ? (
                                "Errore nell'invio della mail"
                            ): (
                                "Mail inviata con successo!"
                            )}
                        </p>
                    </div>
                )}


            </form>
        </div>
    )
}

export default Details
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Details = () => {


    const [reviews, setRev] = useState([])
    const [doctor, setDoc] = useState({})

    const { slug } = useParams()

    const [formData, setFormData] = useState({
        subject: "",
        text: "",
      });

    const sendMail = (event) => {
        event.preventDefault()
        axios
        .post(`http://localhost:3000/medici/${slug}/send-mail`, formData)
        .then((resp) => {
            console.log(resp);
        })
    }

    const onMailChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(formData);
        
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
                setDoc(resp.data.data[0])

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
                        <button type="submit" className="btn btn-primary mb-5">Invia</button>
                </div>


            </form>
        </div>
    )
}

export default Details
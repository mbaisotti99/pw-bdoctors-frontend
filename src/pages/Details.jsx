import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Details = () => {


    const [reviews, setRev] = useState([])
    const [doctor, setDoc] = useState({})

    const {slug} = useParams()

    const printStars = (vote) => {
        let count = ""
        for (let i = 0; i < vote; i++){
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
    },[])

    useEffect(() => {
        axios
        .get(`http://localhost:3000/medici/${slug}/recensioni`)
        .then((resp) => {
            // console.log(resp);
            setRev(resp.data.data)
        })
    }, [doctor])

    

    return(
        <div className="container">
            <div className="detailCard">
                <ul className="details">
                    <li><img src={`http://localhost:3000/images/${doctor.immagine}`} alt={`${doctor.nome} ${doctor.cognome}`} width={350} className="docImg"/></li>
                    <li className="docName">{`${doctor.nome} ${doctor.cognome}`}</li>
                    <li>{doctor.email}</li>
                    <li>{doctor.telefono}</li>
                    <li>{doctor.specializzazione}</li>
                </ul>
            </div>
            <h2 className="text-center mb-5">Recensioni</h2>
            <div className="reviews">
                {reviews.map((curRev, i) => {
                    return(
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
        </div>
    )
}

export default Details
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Details = () => {
    const recensioni = [
        {
          id: 1,
          id_medico: 2,
          recensione: "Ottimo dottore, molto professionale e attento alle esigenze del paziente.",
          voto: 5,
          nome_utente: "Marco Rossi",
          email_utente: "marco.rossi@example.com"
        },
        {
          id: 2,
          id_medico: 2,
          recensione: "Esperienza positiva, spiegazioni chiare e dettagliate.",
          voto: 4,
          nome_utente: "Anna Bianchi",
          email_utente: "anna.bianchi@example.com"
        },
        {
          id: 3,
          id_medico: 2,
          recensione: "Un po’ di attesa ma il medico è stato molto cortese.",
          voto: 3,
          nome_utente: "Luca Verdi",
          email_utente: "luca.verdi@example.com"
        },
        {
          id: 4,
          id_medico: 2,
          recensione: "Non mi sono trovato bene, tempi di attesa troppo lunghi.",
          voto: 2,
          nome_utente: "Giulia Neri",
          email_utente: "giulia.neri@example.com"
        },
        {
          id: 5,
          id_medico: 2,
          recensione: "Fantastico specialista, mi ha aiutato tantissimo.",
          voto: 5,
          nome_utente: "Paolo Gialli",
          email_utente: "paolo.gialli@example.com"
        }
      ];


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
                    <li><img src={`http://localhost:3000/images/${doctor.immagine}`} alt={`${doctor.nome} ${doctor.cognome}`} width={200} className="docImg"/></li>
                    <li className="docName">{`${doctor.nome} ${doctor.cognome}`}</li>
                    <li>{doctor.email}</li>
                    <li>{doctor.telefono}</li>
                    <li>{doctor.specializzazione}</li>
                </ul>
            </div>

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
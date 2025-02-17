import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MailForm from "../components/MailForm"
import SendReviewForm from "../components/SendReviewForm"
import { FaStar } from "react-icons/fa"

const Details = () => {


    const [reviews, setRev] = useState([])
    const [doctor, setDoc] = useState({})


    const { slug } = useParams()



    const printStars = (vote) => {
        let count = []
        for (let i = 0; i < vote; i++) {
            count.push("")
        }
        return (
            <>
            {count.map((n, i) => {
                return (
                    <FaStar
                    color="gold"
                    size={30}
                    key={i}
                    />
                )
            })}
            </>
        )
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

    }, [doctor, reviews])


    const [activePage, setActivePage] = useState("")

    const voteAvg = () => {
        let count = 0
        for (let i = 0; i < reviews.length; i++) {
            count += reviews[i].voto
        }

        return (count / reviews.length).toFixed(2)
    }



    return (
        <>
            <div className={`modalScreen ${!activePage && "d-none"}`} onClick={() => {setActivePage("")}}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="close" onClick={() => {setActivePage("")}}>
                        X
                    </div>
                    {
                        (activePage == "mail") ?

                            (
                                <>
                                    <h2 className="text-center my-5">Chiedi consulenza</h2>

                                    <MailForm
                                        medSlug={slug}
                                    />
                                </>
                            ) : (
                                <>
                                    <h2 className="mt-5 text-center">Lascia una recensione</h2>

                                    <SendReviewForm
                                        medSlug={slug}
                                    />
                                </>
                            )
                    }
                </div>
            </div>
            <div className="container">
                <div className="detailCard">
                    <img src={`http://localhost:3000/images/${doctor.immagine}`} alt={`${doctor.nome} ${doctor.cognome}`} width={350} />
                    <ul className="details">
                        <li className="docName">{`${doctor.nome} ${doctor.cognome}`}</li>
                        <li>{doctor.email}</li>
                        <li>{doctor.telefono}</li>
                        <li>{doctor.specializzazione}</li>
                        <li>{printStars(voteAvg())} ({voteAvg()}) </li>
                    </ul>
                    <p className="docDesc">
                        {doctor.descrizione}
                    </p>
                </div>
                <div className="modalsCard">
                    <div className="pageSelect">
                        <button
                            className={`btn btn-primary ${activePage === "mail" && "active"}`}
                            onClick={() => setActivePage("mail")}
                        >
                            Manda una mail
                        </button>

                        <button
                            className={`btn btn-primary ms-2 ${activePage === "rev" && "active"}`}
                            onClick={() => setActivePage("rev")}
                        >
                            Scrivi una recensione
                        </button>
                    </div>
                </div>

                <h2 className="text-center mb-5">Recensioni</h2>

                <div className="reviews row">
                    {reviews.map((curRev, i) => {
                        const dataFormat = new Date(curRev.data);

                        
                        return (
                            <div className="col-4">

                                <div className="reviewCard" key={i}>
                                    <ul className="rev">
                                        <li className="revDate">{dataFormat.toISOString().split('T')[0]}</li>
                                        <li className="revName">{curRev.nome_utente}</li>
                                        <li>{printStars(curRev.voto)}</li>
                                        <li>{curRev.recensione}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>











            </div>
        </>
    )
}

export default Details
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import MailForm from "../components/MailForm"
import SendReviewForm from "../components/SendReviewForm"
import { FaStar } from "react-icons/fa"
import { IoIosCloseCircleOutline } from "react-icons/io"


const Details = ({ activePage, setActivePage }) => {


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
                            size={15}
                            key={i}
                            style={{
                                color: "gold",
                                stroke: "black",
                                strokeWidth: "5px", // Spessore del bordo
                            }}
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


    // const [activePage, setActivePage] = useState("")

    const [animate, setAnimate] = useState(false)

    const voteAvg = () => {
        let count = 0
        for (let i = 0; i < reviews.length; i++) {
            count += reviews[i].voto
        }

        return (count / reviews.length).toFixed(2)
    }


    return (
        <>

            <div id="modalScreen" className={`modalScreen ${!activePage && "d-none"} ${animate && "animate"}`} onClick={() => { setAnimate(true); setTimeout(() => { setActivePage(""); setAnimate(false) }, 500) }}>
                <div className={`modal ${animate && "animate"}`} onClick={(e) => e.stopPropagation()}>
                    <div className="close" onClick={() => { setAnimate(true); setTimeout(() => { setActivePage(""); setAnimate(false) }, 500) }}>
                        <IoIosCloseCircleOutline
                            size={30}
                            className="closeBtn"
                        />
                    </div>
                    {
                        (activePage == "mail") &&

                        (
                            <>
                                <h2 className="text-center my-5">Chiedi consulenza</h2>

                                <MailForm
                                    medSlug={slug}
                                    setActivePage={setActivePage}
                                    setAnimate={setAnimate}
                                    animate = {animate}
                                />
                            </>
                        )
                    }

                    {
                        (activePage == "rev") && (
                            <>
                                <h2 className="mt-5 text-center">Lascia una recensione</h2>

                                <SendReviewForm
                                    medSlug={slug}
                                    setActivePage={setActivePage}
                                    setAnimate={setAnimate}
                                    animate = {animate}
                                />
                            </>
                        )
                    }

                </div>
            </div>

            <div className="detail-header container">
                <Link
                    to="/"
                    className="home-btn"
                >
                    <i className="fas fa-arrow-left"></i> Home
                </Link>

                {/* TITOLO SEZIONE */}
                <h1 className="doctor-title">{`Pagina di ${doctor.nome} ${doctor.cognome}`}</h1>
            </div>

            <div className="container detail-container">
                <div className="detailCard">
                    <div className="detail-middle">
                        <div className="detail-img-div">
                            <img
                                src={`http://localhost:3000/images/${doctor.immagine}`}
                                alt={`${doctor.nome} ${doctor.cognome}`}
                                className="detail-img"
                            />
                        </div>
                        <div className="details">
                            <p className="docName">{`${doctor.nome} ${doctor.cognome}`}</p>
                            <p className="details-spec mb-2">{doctor.specializzazione}</p>
                            <a href={`mailto:${doctor.email}`} className="detail-mail">{doctor.email}</a>
                            <a href={`tel:${doctor.telefono}`} className="detail-phone mb-3">{doctor.telefono}</a>
                            <p className="details-vote">{printStars(voteAvg())}  ({voteAvg()}) </p>
                        </div>
                    </div>
                    <div className="detail-description">
                        <p className="docDesc">"{doctor.descrizione}"</p>
                    </div>
                </div>
                <div className="modalsCard  mb-5">
                    <div className="pageSelect">
                        <button
                            className={`detail-btn ${activePage === "mail" && "active"}`}
                            onClick={() => setActivePage("mail")}
                        >
                            Manda una mail
                        </button>

                        <button
                            className={`detail-btn ${activePage === "rev" && "active"}`}
                            onClick={() => setActivePage("rev")}
                        >
                            Scrivi una recensione
                        </button>
                    </div>
                </div>

                <h2 className="review-main-title mb-3"><i className="fa-solid fa-comment"></i> Recensioni</h2>

                <div className="reviews row">
                    {reviews.map((curRev, i) => {
                        const dataFormat = new Date(curRev.data);

                        return (


                            <div className="col-12 col-md-4 g-3" key={i}>

                                <div className="reviewCard h-100">
                                    <div className="rev">
                                        <div className="review-card-header">
                                            <p className="revDate">{dataFormat.toISOString().split('T')[0]}</p>
                                            <p className="review-stars">{printStars(curRev.voto)}</p>
                                        </div>
                                        <div className="review-body">
                                            <p className="revName">{curRev.nome_utente}</p>
                                            <p className="user-review">{curRev.recensione}</p>
                                        </div>
                                    </div>
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
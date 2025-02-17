import axios from "axios"
import { useState } from "react"
import { FaStar } from "react-icons/fa"

const SendReviewForm = ({ medSlug }) => {

    const [popup, setPopup] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [errMsg, setErrMsg] = useState("Errore nell'invio della recensione")

    const [vote, setVote] = useState(null)

    const stars = Array.from({ length: 5 }, (_, i) => { i });


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsErr(false)
        setPopup(false) 

        axios
            .post(`http://localhost:3000/medici/${medSlug}/recensioni`, formData)
            .then((resp) => {
                setPopup(true)
            })
            .catch((err) => {
                setPopup(true)
                setIsErr(true)
                setErrMsg(err.response.data.message)
            })
    }

    const [formData, setFormData] = useState({
        nome_utente: "",
        email_utente: "",
        recensione: "",
        voto: ""
    })



    return (
        <form className="text-center reviewBox mt-4" onSubmit={handleSubmit}>

            <div className="has-validation">
                <label htmlFor="#nome_utente">Nome Utente</label>
                <input onChange={handleChange} value={formData.nome_utente} type="text" className={`form-control ${(formData.nome_utente.length < 3 && popup) && "error"}`} name="nome_utente" id="nome_utente" />
                <div className={`alert ${(formData.nome_utente.length < 3 && popup) ? "alert-danger" : "d-none"}`}>
                    {!formData.nome_utente && "Nome Utente Obbligatorio"}
                    {(formData.nome_utente && formData.nome_utente.length < 3) && "Nome Utente Troppo Corto (Minimo 3 caratteri)"}
                </div>
            </div>

            <div>
                <label htmlFor="#email_utente">Email Utente</label>
                <input onChange={handleChange} value={formData.email_utente} type="text" className={`form-control ${(formData.email_utente.length < 3 && popup) && "error"}`} name="email_utente" id="email_utente" />
                <div className={`alert ${(formData.email_utente.length < 3 && popup || errMsg == "L'email inserita non è valida") ? "alert-danger" : "d-none"}`}>
                    {!formData.email_utente && "Email Utente Obbligatoria"}
                    {(formData.email_utente && formData.email_utente.length < 3) && "Email Utente Troppo Corta (Minimo 3 caratteri)"}
                    {(formData.email_utente.length >=3 && errMsg == "L'email inserita non è valida") && "Inserisci una mail valida"}
                </div>
            </div>

            <div>
                <label className="mx-3 my-1" htmlFor="#voto">Voto</label>
                {
                    stars.map((star, i) => {
                        const curStarN = i + 1
                        return (
                            <>
                                <FaStar
                                    key={curStarN}
                                    size={30}
                                    style={{ cursor: "pointer" }}
                                    color={curStarN <= vote ? "gold" : "grey"}
                                    onClick={() => {
                                        setVote(curStarN)
                                        setFormData({ ...formData, voto: curStarN })
                                    }}
                                />
                            </>

                        )
                    })
                }
                <div className={`alert ${(!formData.voto && popup) ? "alert-danger" : "d-none"}`}>
                    Voto Obbligatorio
                </div>
            </div>

            <div>
                <label htmlFor="#recensione">Testo della recensione</label>
                <textarea onChange={handleChange} value={formData.recensione} name="recensione" className={`form-control mb-5 ${(formData.recensione.length < 3 && popup) && "error"}`} id="recensione" />
                <div className={`alert ${(formData.recensione.length < 3 && popup) ? "alert-danger" : "d-none"}`}>
                    {!formData.recensione && "Testo Recensione Obbligatorio"}
                    {(formData.recensione && formData.recensione.length < 3) && "Testo Recensione Troppo Corto (Minimo 3 caratteri)"}
                </div>
            </div>


            <button className="btn btn-primary mb-5" type="submit">Invia Recensione</button>

            {(popup) && (
                <div className={`alert ${!isErr ? "alert-success" : "alert-danger"} `}>
                    <p className="fs-4 text-center w-100 m-0">
                        {isErr ? errMsg : "Recensione caricata con successo!"}                        
                    </p>
                </div>
            )}

        </form>
    )
}

export default SendReviewForm
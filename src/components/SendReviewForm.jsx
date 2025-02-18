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
                setIsErr(false)
                setFormData({
                    nome_utente: "",
                    email_utente: "",
                    recensione: "",
                    voto: ""
                })
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

    const checkMail = (mail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            return false
        } else {
            return true
        }
    }


    return (
        <form className="reviewBox" onSubmit={handleSubmit}>

            <div>
                <label htmlFor="#nome_utente">Nome Utente</label>
                <input
                    onChange={handleChange}
                    value={formData.nome_utente}
                    type="text" className={`form-control ${(formData.nome_utente.length < 3 && popup) && "error"}`}
                    name="nome_utente" id="nome_utente"
                    placeholder="Mario Rossi"
                />
                <div className={`alert ${(formData.nome_utente.length < 3 && popup && isErr) ? "alert-danger" : "d-none"}`}>
                    {!formData.nome_utente && "Nome Utente Obbligatorio"}
                    {(formData.nome_utente && formData.nome_utente.length < 3) && "Nome Utente Troppo Corto (Minimo 3 caratteri)"}
                </div>
            </div>

            <div className="mb-3">
                <label className="mb-3" htmlFor="#email_utente">Email Utente</label>
                <input
                    onChange={handleChange}
                    value={formData.email_utente}
                    type="text" className={`form-control ${(formData.email_utente.length < 3 && popup) || (formData.email_utente.length >= 3 && !checkMail(formData.email_utente) && isErr) ? "error" : ""}`}
                    name="email_utente"
                    id="email_utente"
                    placeholder="email@esempio.it"
                />
                <div className={`alert mt-3 ${(formData.email_utente.length < 3 && popup && isErr || (formData.email_utente.length >= 3 && !checkMail(formData.email_utente) && isErr)) ? "alert-danger" : "d-none"}`}>
                    {(!formData.email_utente && popup) && "Email Utente Obbligatoria"}
                    {(formData.email_utente && formData.email_utente.length < 3) && "Email Utente Troppo Corta (Minimo 3 caratteri)"}
                    {(formData.email_utente.length >= 3 && !checkMail(formData.email_utente)) && "Inserisci una mail valida"}
                </div>
            </div>

            <div>
                <label className="my-1 voteTxt" htmlFor="#voto">Voto</label>
                {
                    stars.map((star, i) => {
                        const curStarN = i + 1
                        return (
                            <>
                                <FaStar
                                    key={curStarN}
                                    size={50}
                                    style={{ 
                                        cursor: "pointer",
                                        stroke: "black",
                                        strokeWidth: "5px",
                                     }}
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
                <div className={`alert ${(!formData.voto && popup && isErr) ? "alert-danger" : "d-none"}`}>
                    Voto Obbligatorio
                </div>
            </div>

            <div>
                <label htmlFor="#recensione">Testo della recensione</label>
                <textarea 
                onChange={handleChange} 
                value={formData.recensione} 
                name="recensione" 
                className={`form-control revText mb-5 ${(formData.recensione.length < 3 && popup && isErr) && "error"}`} 
                id="recensione" 
                placeholder="Descrivi la tua esperienza..."
                />
                <div className={`alert ${(formData.recensione.length < 3 && popup && isErr) ? "alert-danger" : "d-none"}`}>
                    {!formData.recensione && "Testo Recensione Obbligatorio"}
                    {(formData.recensione && formData.recensione.length < 3) && "Testo Recensione Troppo Corto (Minimo 3 caratteri)"}
                </div>
            </div>


            <button className="btn btn-success mb-5" type="submit">Invia Recensione</button>

            {(popup && !isErr) && (
                <div className={`alert alert-success mb-3`}>
                    <p className="fs-4 text-center w-100 m-0">
                        Recensione caricata con successo!
                    </p>
                </div>
            )
        }
         { (popup && errMsg == "Hai già recensito questo medico")  && (
                <div className={`alert alert-danger mb-3`}>
                    <p className="fs-4 text-center w-100 m-0">
                        {errMsg}
                    </p>
                </div>
            )}

        </form>
    )
}

export default SendReviewForm
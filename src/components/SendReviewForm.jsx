import axios from "axios"
import { useState } from "react"

const SendReviewForm = ({medSlug}) => {

    const [popup, setPopup] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [errMsg, setErrMsg] = useState("Errore nell'invio della recensione")

    const stars = Array.from({length : 5}, (_, i) => {
        return "⭐".repeat(i + 1)
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsErr(false)

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



    return(
        <form className="text-center reviewBox mt-4" onSubmit={handleSubmit}>
            
            <label htmlFor="nome_utente">Nome Utente</label>
            <input onChange={handleChange} value={formData.nome_utente} type="text"  className="form-control" name="nome_utente"/>
            
            <label htmlFor="email_utente">Email Utente</label>
            <input onChange={handleChange} value={formData.email_utente} type="text"  className="form-control" name="email_utente"/>
            
            <label htmlFor="voto">Voto</label>
            <select onChange={handleChange} value={formData.voto} name="voto" className="form-control text-center">
                {
                    stars.map((starN, i) => {
                        return(
                            <option key={i} value={i + 1}>{starN}</option>
                        )
                    })
                }
            </select>

            <label htmlFor="recensione">Testo della recensione</label>
            <textarea onChange={handleChange} value={formData.recensione} name="recensione" className="form-control mb-5"/>

            <button className="btn btn-primary mb-5" type="submit">Invia Recensione</button>

            {popup && (
                <div className={`alert ${isErr ? ("alert-danger") : ("alert-success")}`}>
                    <p className="fs-4 text-center w-100 m-0">
                        {isErr ? (
                            `${errMsg}`
                        ) : (
                            "Recensione caricata con successo!"
                        )}
                    </p>
                </div>
            )}

        </form>
    )
}

export default SendReviewForm
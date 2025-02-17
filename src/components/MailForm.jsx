import axios from "axios";
import { useState } from "react";

const MailForm = ({ medSlug }) => {

    const [popup, setPopup] = useState(false)
    const [isErr, setIsErr] = useState(false)

    const [errMsg, setErrMsg] = useState("Errore nell'invio della recensione")

    const [formData, setFormData] = useState({
        text: "",
        nome_utente: "",
        email_utente: ""
    });

    const checkMail = (mail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            return false 
        } else {
            return true
        }
    }

    const sendMail = (event) => {
        event.preventDefault()
        setPopup(false)
        setIsErr(false)
        setErrMsg("")
        axios
            .post(`http://localhost:3000/medici/${medSlug}/send-mail`, formData)
            .then((resp) => {
                console.log(resp);
                setPopup(true);
            })
            .catch((err) => {
                setPopup(true);
                setIsErr(true)
                setErrMsg(err.response.data.message)
                console.log(err);

            })
    }

    const onMailChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }



    return (
        <form onSubmit={sendMail}>
            <div className="text-center">
                <div className="mb-3">
                    <label className="mb-3" htmlFor="#nome_utente">Nome Utente</label>
                    <input onChange={onMailChange} value={formData.nome_utente} type="text" className={`form-control ${(formData.nome_utente.length < 3 && popup) && "error"}`} name="nome_utente" id="nome_utente" />
                    <div className={`alert mt-3 ${(formData.nome_utente.length < 3 && popup) ? "alert-danger" : "d-none"}`}>
                        {!formData.nome_utente && "Nome Utente Obbligatorio"}
                        {(formData.nome_utente && formData.nome_utente.length < 3) && "Nome utente troppo corto (Minimo 3 caratteri)"}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="mb-3" htmlFor="#email_utente">Email Utente</label>
                    <input onChange={onMailChange} value={formData.email_utente} type="text" className={`form-control ${(formData.email_utente.length < 3 && popup) || (formData.email_utente.length >= 3 && !checkMail(formData.email_utente)) ? "error" : ""}`} name="email_utente" id="email_utente" />
                    <div className={`alert mt-3 ${(formData.email_utente.length < 3 && popup || (formData.email_utente.length >= 3 && !checkMail(formData.email_utente))) ? "alert-danger" : "d-none"}`}>
                        {(!formData.email_utente && popup) && "Email Utente Obbligatoria"}
                        {(formData.email_utente && formData.email_utente.length < 3) && "Email Utente Troppo Corta (Minimo 3 caratteri)"}
                        {(formData.email_utente.length >= 3 && !checkMail(formData.email_utente)) && "Inserisci una mail valida"}
                    </div>
                </div>

                <label className="my-3" htmlFor="text">Testo</label>
                <textarea
                    className={`form-control mb-4 ${(formData.text.length < 3 && popup) && "error"}`}
                    name="text"
                    value={formData.text}
                    onChange={onMailChange}
                />
                <div className={`alert mt-3 ${(formData.text.length < 3 && popup) ? "alert-danger" : "d-none"}`}>
                    {!formData.text && "Nome Utente Obbligatorio"}
                    {(formData.text && formData.text.length < 3) && "Testo della mail troppo corto (Minimo 3 caratteri)"}
                </div>
                <button type="submit" className="btn btn-success mb-4">Invia</button>
            </div>
            {popup && (
                <div className={`alert ${isErr ? ("alert-danger") : ("alert-success")}`}>
                    <p className="fs-4 text-center w-100 m-0">
                        {isErr ? (
                            `${errMsg}`
                        ) : (
                            "Mail inviata con successo!"
                        )}
                    </p>
                </div>
            )}

        </form>
    )
}

export default MailForm
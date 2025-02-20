import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MailForm = ({ medSlug, setActivePage, setAnimate, setModalFading }) => {

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
                setAnimate(true); 
                setTimeout(() => {setFading(true); setModalFading(true)}, 2000)
                setTimeout(() => { setActivePage(""); setAnimate(false);  setModalFading(false) }, 2500)
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

    const [fading, setFading] = useState(false)





    return (
            <form onSubmit={sendMail} className="row">
                <div>
                    <div className="mb-3">
                        <label className="mb-3" htmlFor="#nome_utente">Nome Utente</label>
                        <input
                            onChange={onMailChange}
                            value={formData.nome_utente}
                            type="text"
                            className={`form-control ${(formData.nome_utente.length < 3 && popup && isErr) ? "error" : ""}`}
                            name="nome_utente"
                            id="nome_utente"
                            placeholder="es. Mario Rossi"
                        />
                        <div className={`alert mt-3 ${(formData.nome_utente.length < 3 && popup && isErr) ? "alert-danger" : "d-none"}`}>
                            {!formData.nome_utente && "Nome Utente Obbligatorio"}
                            {(formData.nome_utente && formData.nome_utente.length < 3) && "Nome utente troppo corto \n (Minimo 3 caratteri)"}
                        </div>
                    </div>



                    <div className="mb-3">
                        <label className="mb-3" htmlFor="#email_utente">Email Utente</label>
                        <input
                            onChange={onMailChange}
                            value={formData.email_utente}
                            type="text"
                            className={`form-control ${(formData.email_utente.length < 3 && popup) || (formData.email_utente.length >= 3 && !checkMail(formData.email_utente) && isErr) ? "error" : ""}`}
                            name="email_utente"
                            id="email_utente"
                            placeholder="es. email@esempio.it"
                        />

                        <div className={`alert mt-3 ${(formData.email_utente.length < 3 && popup || (formData.email_utente.length >= 3 && !checkMail(formData.email_utente) && isErr)) ? "alert-danger" : "d-none"}`}>
                            {(!formData.email_utente && popup) && "Email Utente Obbligatoria"}
                            {(formData.email_utente && formData.email_utente.length < 3) && "Email Utente Troppo Corta \n (Minimo 3 caratteri)"}
                            {(formData.email_utente.length >= 3 && !checkMail(formData.email_utente)) && "Inserisci una mail valida"}
                        </div>
                    </div>



                    <label className="my-3" htmlFor="text">Testo</label>
                    <textarea
                        className={`mailTxt form-control mb-4 ${(formData.text.length < 3 && popup && isErr) && "error"}`}
                        name="text"
                        value={formData.text}
                        onChange={onMailChange}
                        placeholder="Descrivi la tua situazione..."
                    />
                    <div className={`alert mt-3 ${(formData.text.length < 3 && popup && isErr) ? "alert-danger" : "d-none"}`}>
                        {!formData.text && "Testo della mail obbligatorio"}
                        {(formData.text && formData.text.length < 3) && "Testo della mail troppo corto (Minimo 3 caratteri)"}
                    </div>
                    <div className="text-center w-100">
                        <button type="submit" className="btn btn-success mb-4">Invia</button>
                    </div>
                    {createPortal((popup && !isErr) && (
                        <div className={`alert alert-success mb-3 success-box ${fading ? "fading" : ""}`}>
                            <p className="fs-4 text-center w-100 m-0">
                                Mail inviata con successo!
                            </p>
                        </div>
                    ), document.getElementById("modalScreen"))}
                </div>
            </form>
    )
}

export default MailForm
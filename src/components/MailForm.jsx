import axios from "axios";
import { useState } from "react";

const MailForm = ({ medSlug }) => {

    const [popup, setPopup] = useState(false)
    const [isErr, setIsErr] = useState(false)

    const [errMsg, setErrMsg] = useState("Errore nell'invio della recensione")

    const [formData, setFormData] = useState({
        subject: "",
        text: "",
    });

    const sendMail = (event) => {
        event.preventDefault()
        setPopup(false)
        setIsErr(false)
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
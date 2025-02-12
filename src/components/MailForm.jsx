const MailForm = ({send, data, change, popup, error}) => {
    return (
        <form onSubmit={send}>
            <div className="text-center">
                <label className="my-3" htmlFor="subject">Soggetto</label>
                <input
                    className="form-control"
                    type="text"
                    name="subject"
                    value={data.subject}
                    onChange={change}
                />
                <label className="my-3" htmlFor="text">Testo</label>
                <textarea
                    className="form-control mb-4"
                    name="text"
                    value={data.text}
                    onChange={change}
                />
                <button type="submit" className="btn btn-primary mb-4">Invia</button>
            </div>
            {popup && (
                <div className={`alert ${error ? ("alert-danger") : ("alert-success")}`}>
                    <p className="fs-4 text-center w-100 m-0">
                        {error ? (
                            "Errore nell'invio della mail"
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
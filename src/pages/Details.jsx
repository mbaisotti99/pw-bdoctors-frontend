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

    const {id} = useParams()

    const printStars = (vote) => {
        let count = ""
        for (let i = 0; i < vote; i++){
            count += "⭐"
        }
        return count
    }

    

    return(
        <div className="container">
            <div className="detailCard">
                <ul className="details">
                    <li><img src="https://thumbs.dreamstime.com/z/icona-femminile-di-medico-infermiere-symbol-67755768.jpg" alt="Nome doc" width={200} /></li>
                    <li>Nome e Cognome di {id}</li>
                    <li>Email</li>
                    <li>Numero</li>
                    <li>Specializzazione</li>
                </ul>
            </div>

            <div className="reviews">
                {recensioni.map((curRev) => {
                    return(
                        <div className="reviewCard">
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
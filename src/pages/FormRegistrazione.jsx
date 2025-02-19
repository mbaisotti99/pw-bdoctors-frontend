// DATA
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/FormRegistrazione.css";


const inputStart = {
  nome: "",
  cognome: "",
  email: "",
  telefono: "+39",
  indirizzo: "",
  citta: "",
  descrizione: "",
  specializzazione: "",
};

function FormRegistrazione() {
  const [inputs, setInputs] = useState(inputStart);
  const [specializzazioni, setSpecializzazioni] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  // CARICA SPECIALIZZAZIONI
  useEffect(() => {
    const fetchSpecializzazioni = async () => {
      try {
        const response = await axios.get("http://localhost:3000/medici/specializzazioni");
        setSpecializzazioni(response.data);
      } catch (error) {
        console.error("Errore nel caricamento delle specializzazioni:", error);
        setError("Errore nel caricamento delle specializzazioni");
      }
    };
    fetchSpecializzazioni();
  }, []);

  function handleOnChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    setError("");
  }

  function validateForm() {
    let errors = {}; // Oggetto per raccogliere gli errori sui campi
    let isValid = true; // Flag per verificare se il form è valido

    // VALIDAZIONE NOME
    if (inputs.nome.trim().length < 3) {
      errors.nome = true;
      setError("Il nome deve avere almeno 3 caratteri");
      isValid = false;
    }

    // VALIDAZIONE COGNOME
    if (inputs.cognome.trim().length < 3) {
      errors.cognome = true;
      setError("Il cognome deve avere almeno 3 caratteri");
      isValid = false;
    }

    // VALIDAZIONE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email.trim())) {
      errors.email = true;
      setError("L'email inserita non è valida");
      isValid = false;
    }

    // VALIDAZIONE TELEFONO
    const telefonoRegex = /^\+\d{6,}$/;
    if (!telefonoRegex.test(inputs.telefono.trim())) {
      errors.telefono = true;
      setError("Il numero di telefono può contenere solo numeri e '+' all'inizio");
      isValid = false;
    }

    // VALIDAZIONE INDIRIZZO
    if (inputs.indirizzo.trim().length < 5) {
      errors.indirizzo = true;
      setError("L'indirizzo deve avere almeno 5 caratteri");
      isValid = false;
    }

    // VALIDAZIONE CITTÀ
    if (!inputs.citta.trim()) {
      errors.citta = true;
      setError("La città è obbligatoria");
      isValid = false;
    }

    // VALIDAZIONE SPECIALIZZAZIONE
    if (!inputs.specializzazione.trim()) {
      errors.specializzazione = true;
      setError("La specializzazione è obbligatoria");
      isValid = false;
    }

    // VALIDAZIONE DESCRIZIONE
    if (inputs.descrizione.trim().length < 20) {
      errors.descrizione = true;
      setError("La descrizione deve avere almeno 20 caratteri");
      isValid = false;
    }

    // VALIDAZIONE IMMAGINE
    if (!selectedFile) {
      errors.immagine = true;
      setError("L'immagine è obbligatoria");
      isValid = false;
    }

    // **🔴 Se ci sono errori, aggiorno lo stato e impedisco l'invio del form**
    setInputErrors(errors); // 🔥 Aggiorna lo stato degli errori
    if (!isValid) {
      return false;
    }

    return true;
  }

  // HANDLE SUBMIT
  async function handleOnSubmit(event) {

    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    // CREAZIONE FORMDATA PER L INVIO DEL FILE
    const formData = new FormData();
    formData.append('nome', inputs.nome);
    formData.append('cognome', inputs.cognome);
    formData.append('email', inputs.email);
    formData.append('telefono', inputs.telefono);
    formData.append('indirizzo', inputs.indirizzo);
    formData.append('citta', inputs.citta);
    formData.append('descrizione', inputs.descrizione);
    formData.append('specializzazione', inputs.specializzazione);
    formData.append('immagine', selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/medici",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSuccess(true);
      setInputs(inputStart);
      setSelectedFile(null);

      // RESET DEL CAMPO FILE
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Errore durante la registrazione');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

      <div className="reg-wrapper container">
        <div className="reg-header">
          <Link
            to="/"
            className="home-btn"
          >
            <i className="fas fa-arrow-left"></i> Home
          </Link>

          {/* TITOLO SEZIONE */}
          <h1 className="doctor-title">Registarti come medico</h1>
        </div>
        <form onSubmit={handleOnSubmit} className="form-container" encType="multipart/form-data">
          <div className="form-wrapper">

            {/* Sezione Sinistra - Form */}
            <div className="form-left">
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={inputs.nome}
                    onChange={handleOnChange}
                    className={inputErrors.nome ? "error-input" : ""}
                    placeholder="Mario"
                  />
                  {inputErrors.nome && <span className="error-message">Il nome deve avere almeno 3 caratteri</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="cognome">Cognome *</label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    value={inputs.cognome}
                    onChange={handleOnChange}
                    className={inputErrors.cognome ? "error-input" : ""}
                    placeholder="Rossi"
                  />
                  {inputErrors.cognome && <span className="error-message">Il cognome deve avere almeno 3 caratteri</span>}
                </div>

                <div className="input-group full-width">
                  <label htmlFor="specializzazione">Specializzazione *</label>
                  <select
                    id="specializzazione"
                    name="specializzazione"
                    value={inputs.specializzazione}
                    onChange={handleOnChange}
                    className={inputErrors.specializzazione ? "error-input" : ""}
                  >
                    <option value="">Seleziona una specializzazione</option>
                    {specializzazioni.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.nome_specializzazione}
                      </option>
                    ))}
                  </select>
                  {inputErrors.specializzazione && <span className="error-message">La specializzazione è obbligatoria</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleOnChange}
                    className={inputErrors.email ? "error-input" : ""}
                    placeholder="medico@example.com"
                  />
                  {inputErrors.email && <span className="error-message">L'email inserita non è valida</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="telefono">Telefono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={inputs.telefono}
                    onChange={handleOnChange}
                    className={inputErrors.telefono ? "error-input" : ""}
                    placeholder="+39 123 456 7890"
                  />
                  {inputErrors.telefono && <span className="error-message">Il numero di telefono può contenere solo numeri e '+' all'inizio</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="indirizzo">Indirizzo *</label>
                  <input
                    type="text"
                    id="indirizzo"
                    name="indirizzo"
                    value={inputs.indirizzo}
                    onChange={handleOnChange}
                    className={inputErrors.indirizzo ? "error-input" : ""}
                    placeholder="Viale Roma 5"
                  />
                  {inputErrors.indirizzo && <span className="error-message">L'indirizzo deve avere almeno 5 caratteri</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="citta">Città *</label>
                  <input
                    type="text"
                    id="citta"
                    name="citta"
                    value={inputs.citta}
                    onChange={handleOnChange}
                    className={inputErrors.citta ? "error-input" : ""}
                    placeholder="Milano"
                  />
                  {inputErrors.citta && <span className="error-message">La città è obbligatoria</span>}
                </div>

                <div className="input-group full-width">
                  <label htmlFor="descrizione">Descrizione *</label>
                  <textarea
                    id="descrizione"
                    name="descrizione"
                    value={inputs.descrizione}
                    onChange={handleOnChange}
                    className={inputErrors.descrizione ? "error-input" : ""}
                    placeholder="Breve descrizione (minimo 20 caratteri)"
                    rows="4"
                  />
                  {inputErrors.descrizione && <span className="error-message">La descrizione deve avere almeno 20 caratteri</span>}
                </div>

                <div className="input-group full-width">
                  <label htmlFor="immagine">Immagine profilo *</label>
                  <input
                    type="file"
                    id="immagine"
                    name="immagine"
                    onChange={handleFileChange}
                    accept="image/*"
                    className={inputErrors.immagine ? "error-input" : ""}
                  />
                  {inputErrors.immagine && <span className="error-message">L'immagine è obbligatoria</span>}
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Registrazione in corso..." : "Registrati"}
              </button>
            </div>

            {/* Sezione Destra - Informazioni */}
            <div className="form-right">
              <h3>Perché registrarti?</h3>
              <p className="reg-info">Registrati per essere trovato dai pazienti e gestire il tuo profilo.</p>
              <div className="reg-benefits">
                <p><i className="fa-solid fa-check"></i> Raggiungi più pazienti</p>
                <p><i className="fa-solid fa-check"></i> Costruisci la tua reputazione</p>
                <p><i className="fa-solid fa-check"></i> Gestisci il tuo profilo con facilità</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

// EXPORT
export default FormRegistrazione;

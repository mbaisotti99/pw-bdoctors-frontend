// DATA
import { useState, useEffect } from "react";
import axios from "axios";
import "./FormRegistrazione.css";


const inputStart = {
  nome: "",
  cognome: "",
  email: "",
  telefono: "+39",
  indirizzo: "",
  citta: "",
  specializzazione: "",
};

function FormRegistrazione() {
  const [inputs, setInputs] = useState(inputStart);
  const [specializzazioni, setSpecializzazioni] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

    // VALIDAZIONI NOME E COGNOME
    if (inputs.nome.length < 3) {
      setError("Il nome deve avere almeno 3 caratteri");
      return false;
    }

    if (inputs.cognome.length < 3) {
      setError("Il cognome deve avere almeno 3 caratteri");
      return false;
    }

    // VALIDAZIONE INDIRIZZO
    if (inputs.indirizzo.length < 5) {
      setError("L'indirizzo deve avere almeno 5 caratteri");
      return false;
    }

    // VALIDAZIONE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setError("L'email inserita non è valida");
      return false;
    }

    // VALIDAZIONE TELEFONO
    const telefonoRegex = /^\+[0-9]+$/;
    if (!telefonoRegex.test(inputs.telefono)) {
      setError("Il numero di telefono può contenere solo numeri e '+' all'inizio");
      return false;
    }

    // VALIDAZIONE CAMPI OBBLIGATORI
    if (!inputs.citta || !inputs.specializzazione) {
      setError("Tutti i campi sono obbligatori");
      return false;
    }

    // VALIDAZIONE FILE
    if (!selectedFile) {
      setError("L'immagine è obbligatoria");
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
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-right">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Registrazione completata con successo!</div>}

          <form onSubmit={handleOnSubmit} encType="multipart/form-data">
            <div className="input-group">
              <label htmlFor="nome">Nome *</label>
              <input type="text" id="nome" name="nome" value={inputs.nome} onChange={handleOnChange} placeholder="Es. Mario" />
            </div>

            <div className="input-group">
              <label htmlFor="cognome">Cognome *</label>
              <input type="text" id="cognome" name="cognome" value={inputs.cognome} onChange={handleOnChange} placeholder="Es. Rossi" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={inputs.email} onChange={handleOnChange} placeholder="Es. medico@example.com" />
            </div>

            <div className="input-group">
              <label htmlFor="telefono">Telefono * (inizia con +39)</label>
              <input type="tel" id="telefono" name="telefono" value={inputs.telefono} onChange={handleOnChange} maxLength={13} />
            </div>

            <div className="input-group">
              <label htmlFor="indirizzo">Indirizzo *</label>
              <input type="text" id="indirizzo" name="indirizzo" value={inputs.indirizzo} onChange={handleOnChange} placeholder="Es. Viale Roma 5" />
            </div>

            <div className="input-group">
              <label htmlFor="citta">Città *</label>
              <input type="text" id="citta" name="citta" value={inputs.citta} onChange={handleOnChange} placeholder="Es. Milano" />
            </div>

            <div className="input-group">
              <label htmlFor="specializzazione">Specializzazione *</label>
              <select id="specializzazione" name="specializzazione" value={inputs.specializzazione} onChange={handleOnChange}>
                <option value="">Seleziona una specializzazione</option>
                {specializzazioni.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.nome_specializzazione}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="immagine">Immagine profilo *</label>
              <input type="file" id="immagine" name="immagine" onChange={handleFileChange} accept="image/*" required />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Registrazione in corso..." : "Registrati"}
            </button>
          </form>
        </div>

        <div className="form-left">
          <h2>Sei un medico? Registrati qui!</h2>
          <p>Registrati per essere trovato dai pazienti e gestire le tue recensioni.</p>
          <ul>
            <li>🔹 Raggiungi più pazienti</li>
            <li>🔹 Costruisci la tua reputazione</li>
            <li>🔹 Gestisci il tuo profilo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// EXPORT
export default FormRegistrazione;

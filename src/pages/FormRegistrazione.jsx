// DATA
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card mb-5">
            <div className="card-header">
              <h3 className="text-center">Sei un medico? Registrati qui!</h3>
            </div>
            <div className="card-body">

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  Registrazione completata con successo!
                </div>
              )}

              <form onSubmit={handleOnSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome: *</label>

                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={inputs.nome}
                    onChange={handleOnChange}
                    placeholder="Es. Mario (almeno 3 caratteri)"
                  />
                
                  <label htmlFor="cognome" className="form-label">Cognome: *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cognome"
                    name="cognome"
                    value={inputs.cognome}
                    onChange={handleOnChange}
                    placeholder="Es. Rossi (almeno 3 caratteri)"
                  />

                  <label htmlFor="email" className="form-label">Email: *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleOnChange}
                    placeholder="Es. medico@example.com"
                  />

                  <label htmlFor="telefono" className="form-label">Telefono: * (inizia con +39)</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={inputs.telefono}
                    onChange={handleOnChange}
                    maxLength={13}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="indirizzo" className="form-label">Indirizzo: *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="indirizzo"
                    name="indirizzo"
                    value={inputs.indirizzo}
                    onChange={handleOnChange}
                    placeholder="Es. Viale Roma 5"
                  />
                
                  <label htmlFor="citta" className="form-label">Città: *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="citta"
                    name="citta"
                    value={inputs.citta}
                    onChange={handleOnChange}
                    placeholder="Es. Milano"
                  />
                
                  <label htmlFor="specializzazione" className="form-label">Specializzazione: *</label>
                  <select
                    className="form-select"
                    id="specializzazione"
                    name="specializzazione"
                    value={inputs.specializzazione}
                    onChange={handleOnChange}
                  >
                    <option value="">Seleziona una specializzazione</option>
                    {specializzazioni.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.nome_specializzazione}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label htmlFor="immagine" className="form-label">Immagine profilo: *</label>
                  <input
                    type="file"
                    className="form-control"
                    id="immagine"
                    name="immagine"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registrazione in corso...' : 'Registrati'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// EXPORT
export default FormRegistrazione;

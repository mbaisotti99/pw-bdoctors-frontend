import { useState } from "react";
import axios from "axios";

const inputStart = {
  nome: "",
  cognome: "",
  email: "",
  telefono: "",
  indirizzo: "",
};

function FormRegistrazione() {
  const [inputs, setInputs] = useState(inputStart);

  function HandleOnChange(event) {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }

  function HandleOnSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3000/medici", inputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Dati inviati:", inputs);
    setInputs(inputStart);
  }

  console.log(inputs);

  return (
    <div className="container">
      <form onSubmit={HandleOnSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={inputs.nome}
            onChange={HandleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="cognome">Cognome:</label>
          <input
            type="text"
            id="cognome"
            name="cognome"
            value={inputs.cognome}
            onChange={HandleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={HandleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="telefono">Telefono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={inputs.telefono}
            onChange={HandleOnChange}
            required
          />
        </div>

        <div>
          <label htmlFor="indirizzo">Indirizzo:</label>
          <input
            type="text"
            id="indirizzo"
            name="indirizzo"
            value={inputs.indirizzo}
            onChange={HandleOnChange}
            required
          />
        </div>

        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default FormRegistrazione;

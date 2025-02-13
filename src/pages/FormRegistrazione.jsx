import { useState } from "react";
import axios from "axios";

const inputStart = {
  nome: "",
  cognome: "",
  email: "",
  telefono: "",
  indirizzo: "",
};

const inputKeys = Object.keys(inputStart)

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

  const getType = (key) => {
    if (key == "email") {
      return "mail"
    } else if (key == "telefono") {
      return "tel"
    } else {
      return "text"
    }
  }

  console.log(inputs);

  return (
    <div className="container">
      <form onSubmit={HandleOnSubmit}>
        {
          inputKeys.map((curKey) => {
            return (
              <div className="my-3">
                <label className="my-2" htmlFor="nome">{`${curKey.charAt(0).toUpperCase()}${curKey.slice(1)}`}:</label>
                <input
                  type={getType(curKey)}
                  id={curKey}
                  name={curKey}
                  value={inputs[curKey]}
                  onChange={HandleOnChange}
                  className="form-control"
                  required
                />
              </div>
            )
          })
        }

        <button className="btn btn-success my-5" type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default FormRegistrazione;

import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const CustosVariados = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCustoVariavel, setIsCustoVariavel] = useState(false);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleCustoVariavelChange = (value) => {
    setIsCustoVariavel(value === "sim");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="bullets">
            <span className="bullet">1</span>
            <hr className="bullet-line" />
            <span className="bullet">2</span>
            <hr className="bullet-line" />
            <span className="bullet">3</span>
            <hr className="bullet-line" />
            <span className="bullet">4</span>
          </div>

          <div className="bullet-labels">
            <span id="lblB1" className="bullet-label">
              Custos Fixos
            </span>
            <span id="lblB2" className="bullet-label">
              Custos Variáveis
            </span>
            <span id="lblB3" className="bullet-label">?</span>
            <span id="lblB4" className="bullet-label">Enviar Solicitação</span>
          </div>

          <div className="options">
            <div className="title">
              <h3>Cadastrar Custos</h3>
              <p>Qual a classificação tributária da empresa?</p>
            </div>

            <label>
              <input
                type="checkbox"
                value="MEI"
                checked={selectedOptions.includes("MEI")}
                onChange={() => handleCheckboxChange("MEI")}
              />
              MEI
            </label> <br/>

            <label>
              <input
                type="checkbox"
                value="Simples Nacional"
                checked={selectedOptions.includes("Simples Nacional")}
                onChange={() => handleCheckboxChange("Simples Nacional")}
              />
              Simples Nacional
            </label> <br/>

            <label>
              <input
                type="checkbox"
                value="Lucro Presumido"
                checked={selectedOptions.includes("Lucro Presumido")}
                onChange={() => handleCheckboxChange("Lucro Presumido")}
              />
              Lucro Presumido
            </label> <br/>

            <label>
              <input
                type="checkbox"
                value="Lucro Real"
                checked={selectedOptions.includes("Lucro Real")}
                onChange={() => handleCheckboxChange("Lucro Real")}
              />  
               Lucro Real
            </label> <br/>

            <p>Deseja Cadastrar um custo Variável?</p>
            <div className="button-group">
              <button
                className={isCustoVariavel ? "active" : ""}
                onClick={() => handleCustoVariavelChange("sim")}
              >
                Sim
              </button>
              <button
                className={!isCustoVariavel ? "active" : ""}
                onClick={() => handleCustoVariavelChange("não")}
              >
                Não
              </button>

            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

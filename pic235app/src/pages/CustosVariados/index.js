import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const CustosVariados = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCustoVariavel, setIsCustoVariavel] = useState(false);
  const [descricaoCusto, setDescricaoCusto] = useState("");
  const [classificacaoUnidade, setClassificacaoUnidade] = useState("");
  const [valor, setValor] = useState("");
  const [custosVariaveis, setCustosVariaveis] = useState([]);

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

  const handleDescricaoCustoChange = (event) => {
    setDescricaoCusto(event.target.value);
  };

  const handleClassificacaoUnidadeChange = (event) => {
    setClassificacaoUnidade(event.target.value);
  };

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleAdicionarCustoVariavel = () => {
    const novoCustoVariavel = {
      descricao: descricaoCusto,
      classificacao: classificacaoUnidade,
      valor: valor,
    };
    setCustosVariaveis([...custosVariaveis, novoCustoVariavel]);
    setDescricaoCusto("");
    setClassificacaoUnidade("");
    setValor("");
  };

  const handleExcluirCustoVariavel = (index) => {
    const novosCustosVariaveis = [...custosVariaveis];
    novosCustosVariaveis.splice(index, 1);
    setCustosVariaveis(novosCustosVariaveis);
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

          <div className="container">
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
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="Simples Nacional"
                  checked={selectedOptions.includes("Simples Nacional")}
                  onChange={() => handleCheckboxChange("Simples Nacional")}
                />
                Simples Nacional
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="Lucro Presumido"
                  checked={selectedOptions.includes("Lucro Presumido")}
                  onChange={() => handleCheckboxChange("Lucro Presumido")}
                />
                Lucro Presumido
              </label>
              <br />

              <label>
                <input
                  type="checkbox"
                  value="Lucro Real"
                  checked={selectedOptions.includes("Lucro Real")}
                  onChange={() => handleCheckboxChange("Lucro Real")}
                />
                Lucro Real
              </label>
              <br />

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

            {isCustoVariavel && (
              <div className="cost-details">
                <h3>Detalhes do Custo Variável</h3>
                <div className="form-group">
                  <label htmlFor="descricaoCusto">Descrição do Custo (Obrigatório)</label>
                  <input
                    type="text"
                    id="descricaoCusto"
                    value={descricaoCusto}
                    onChange={handleDescricaoCustoChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="classificacaoUnidade">Classificação da Unidade (Obrigatório)</label>
                  <select
                    id="classificacaoUnidade"
                    value={classificacaoUnidade}
                    onChange={handleClassificacaoUnidadeChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="mes">Mês</option>
                    <option value="ano">Ano</option>
                    <option value="litro">Litro (L)</option>
                    <option value="metro">Metro (M)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="valor">Valor (Obrigatório)</label>
                  <input
                    type="number"
                    id="valor"
                    value={valor}
                    onChange={handleValorChange}
                    required
                  />
                </div>
                <button onClick={handleAdicionarCustoVariavel}>Adicionar</button>
              </div>
            )}

            {custosVariaveis.length > 0 && (
              <div className="table">
                <h3>Custos Variáveis Cadastrados</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Classificação</th>
                      <th>Valor</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {custosVariaveis.map((custo, index) => (
                      <tr key={index}>
                        <td>{custo.descricao}</td>
                        <td>{custo.classificacao}</td>
                        <td>{custo.valor}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const CustosFixos = (props) => {
  const [custosFixos, setCustosFixos] = useState([]);

  // Função para adicionar dados simulados
  const adicionarDadosSimulados = () => {
    setCustosFixos([
      {
        id: 1,
        descricao: "Custo Fixo 1",
        classificacao: "Mês",
        unidade: "Unidade 1",
        valor: 1000,
        vigenciaInicio: "2023-06-01",
        vigenciaFim: "2023-06-30",
      },
      {
        id: 2,
        descricao: "Custo Fixo 2",
        classificacao: "Mês",
        unidade: "Unidade 2",
        valor: 2000,
        vigenciaInicio: "2023-07-01",
        vigenciaFim: "2023-07-31",
      },
    ]);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="side-menu">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Notificações</a>
            </li>
            <li>
              <a href="#" className="active">
                Cadastro de Custos
              </a>
            </li>
            <li>
              <a href="#">Custos Fixos</a>
            </li>
          </ul>
        </div>
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
            <span id="lblB4" className="bullet-label">
              Enviar Solicitação
            </span>
          </div>

          <div className="input-container">
            <div className="input-group">
              <label htmlFor="descricao">Descrição do Custo</label>
              <input type="text" id="descricao" />
            </div>
            <div className="input-group">
              <label htmlFor="classificacao">Classificação da Unidade</label>
              <select id="classificacao">
                <option value="mes">Mês</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="unidade">Unidade</label>
              <input type="text" id="unidade" />
            </div>
            <div className="input-group">
              <label htmlFor="valor">Valor</label>
              <input type="number" id="valor" />
            </div>
            <div className="input-group">
              <label htmlFor="vigencia-inicio">Vigência a partir de:</label>
              <input type="date" id="vigencia-inicio" />
            </div>
            <div className="input-group">
              <label htmlFor="vigencia-fim">Vigência até:</label>
              <input type="date" id="vigencia-fim" />
            </div>
            <div className="input-group">
              <button onClick={adicionarDadosSimulados}>Adicionar</button>
            </div>
          </div>

          <table className="custos-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Classificação</th>
                <th>Unidade</th>
                <th>Valor</th>
                <th>Vigência a partir de:</th>
                <th>Vigência até:</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {custosFixos.map((custo) => (
                <tr key={custo.id}>
                  <td>{custo.descricao}</td>
                  <td>{custo.classificacao}</td>
                  <td>{custo.unidade}</td>
                  <td>{custo.valor}</td>
                  <td>{custo.vigenciaInicio}</td>
                  <td>{custo.vigenciaFim}</td>
                  <td>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

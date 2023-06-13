import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const CustosFixos = (props) => {
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
              <a href="#" className="active">Cadastro de Custos</a>
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
            <span id="lblB1" className="bullet-label">Custos Fixos</span>
            <span id="lblB2" className="bullet-label">Custos Variáveis</span>
            <span id="lblB3" className="bullet-label">?</span>
            <span id="lblB4" className="bullet-label">Enviar Solicitação</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

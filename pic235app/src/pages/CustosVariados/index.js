import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const CustosVariados = (props) => {
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

        </div>
        </div>
    </div>
  );
};

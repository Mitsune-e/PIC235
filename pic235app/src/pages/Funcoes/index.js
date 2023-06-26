import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Funcoes = (props) => {


  return (
    <div>
      <Navbar />
      <div className="mainbox">
        <div className="container">
          <div className="options-container">
            <form className="search-bar">
              <input placeholder="Pesquisar" />
              <button href="#">Pesquisar</button>
            </form>
            <div className="right-options">
              <a href="#">Perguntas Frequentes |</a>
              <a href="#">Usuário</a>
            </div>
          </div>
          <div className="mb-1 titulo-cadastro">
            <h3>Funções</h3>
          </div>
          <div className="functions">
            <button id="leaderButton">Líder Máximo</button>
            <button id="projectManagerButton">Gerente de Projeto</button>
            <button id="dataButton">Entrada/Consulta de Dados</button>
          </div>
          <div className="dashboard" id="dashboard">
            <h2>Líder Máximo</h2>
            <label for="createEditProjects">
            </label>
            <label for="createEditProfiles">
            </label>
            <label for="createEditCosts">
            </label>
          </div>
        </div>
      </div>
    </div>


  )
}

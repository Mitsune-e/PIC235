import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Perfil = (props) => {


  return (
    <div>
      <Navbar />
      <div className="mainbox">
          <div class="container">
        <div class="options-container">
          <form class="search-bar">
            <input placeholder="Pesquisar"/>
            <button href="#">Pesquisar</button>
          </form>
          <div class="right-options">
            <a href="#">Perguntas Frequentes |</a>
            <a href="#">Usuário</a>
          </div>
        </div>
        <div class="mb-1 titulo-cadastro">
          <h3>Perfil do Usuário</h3>
        </div>
        <div class="functions">
          <button id="leaderButton">Líder Máximo</button>
          <button id="projectManagerButton">Gerente de Projeto</button>
          <button id="dataButton">Entrada/Consulta de Dados</button>
        </div>
        <div class="dashboard" id="dashboard">
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

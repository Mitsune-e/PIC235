import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Notificacoes = (props) => {


  return (
    <div>
      <Navbar />
      <div className="mainbox">
        <div className="mb-1 titulo-cadastro">
            <h3 className="text-navy">Notificações</h3>
        </div>
        <div class="painel">
            <table>
              <tr id="title">
                <th>Solicitante</th>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
              <tr>
                <td>Batman</td>
                <td>Entrada no sistema</td>
                <td class="buttons">
                  <button class="acceptButton">Adicionar um perfil</button>
                  <button class="declineButton">Remover</button>
                </td>
              </tr>
              <tr>
                <td>Flash</td>
                <td>Alteração no nome do projeto</td>
                <td class="buttons">
                  <button class="acceptButton">Aceitar</button>
                  <button class="declineButton">Negar</button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
        </div>
      </div>
    </div>
  )
}

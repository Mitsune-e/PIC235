import React, { useState } from "react";
import { SideBar } from "../../components";
import "./index.css"

export const Notificacoes = (props) => {


  return (
    <div>
      <SideBar />
      <div className="mainbox">
        <div className="mb-1 titulo-cadastro">
          <h3 className="text-navy">Notificações</h3>
        </div>
        <div className="painel">
          <table>
            <tr id="title">
              <th>Solicitante</th>
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
            <tr>
              <td>Batman</td>
              <td>Entrada no sistema</td>
              <td className="buttons">
                <button className="acceptButton">Adicionar um perfil</button>
                <button className="declineButton">Remover</button>
              </td>
            </tr>
            <tr>
              <td>Flash</td>
              <td>Alteração no nome do projeto</td>
              <td className="buttons">
                <button className="acceptButton">Aceitar</button>
                <button className="declineButton">Negar</button>
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

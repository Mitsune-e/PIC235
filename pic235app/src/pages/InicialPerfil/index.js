import React, { useState } from "react";
import { SideBar } from "../../components";
import "./index.css";

export const InicialPerfil = (props) => {
  return (
    <div>
      <SideBar />
      <div className="mainbox">

        <div className="mb-1 titulo-cadastro">
          <h3 className="text-navy">Perfils</h3>
        </div>
        <div className="painel">
          <table>
            <tr id="title">
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Função</th>
              <th>Ações</th>
            </tr>
            <tr>
              <td>José Carlos</td>
              <td>(00)00000</td>
              <td>jose@aa.com</td>
              <td>Gerente de Projetos</td>
              <td>Remover</td>
            </tr>
            <tr>
              <td>xxx</td>
              <td>(00)00000</td>
              <td>xxx@xxx.com</td>
              <td>xxxx</td>
              <td>Remover</td>
            </tr>

            <tr>
              <td>xxx</td>
              <td>(00)00000</td>
              <td>xxx@xxx.com</td>
              <td>xxxx</td>
              <td>x</td>
            </tr>

            <tr>
              <td>xxx</td>
              <td>(00)00000</td>
              <td>xxx@xxx.com</td>
              <td>xxxx</td>
              <td>x</td>
            </tr>

            <tr>
              <td>xxx</td>
              <td>(00)00000</td>
              <td>xxx@xxx.com</td>
              <td>xxxx</td>
              <td>x</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

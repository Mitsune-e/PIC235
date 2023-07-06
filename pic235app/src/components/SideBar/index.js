import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { EmpresaService } from "../../services";


export const SideBar = () => {
  const [Erro, setErro] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState();

  useEffect(() => {
    //useEffect to get cliente types from database
    (async () => {
      try {
        const dadosEmpresa = await EmpresaService.Buscar();

        setNomeEmpresa(dadosEmpresa.NOME_FAN_EMPRESA);
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, []);

  return (
    <>
      <div>
        <div className="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="side-panel" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-navy" id="offcanvasScrollingLabel">{nomeEmpresa}</h5>
          </div>
          <div className="option-row">
            <ul className="sidebar-nav">
              <li className="sidebar-item"><Link className="sidebar-link" to="/dashboard">Dashboard</Link></li>
              <li className="sidebar-item"><Link className="sidebar-link" to="/empresa">Perfil da Empresa</Link></li>
              <li className="sidebar-item"><Link className="sidebar-link" to="/funcoes">Funções da Empresa</Link></li>
              <li className="sidebar-item"><Link className="sidebar-link" to="/custos">Cadastro de Custos</Link></li>
              <li className="sidebar-item"><Link className="sidebar-link" to="/projeto">Projeto</Link></li>
              <li className="sidebar-item"><Link className="sidebar-link" to="/cadastro">Cadastro de Usuarios</Link></li>
            </ul>
          </div>
          {Erro !== "" && <div className="alert alert-danger">{Erro}</div>}
        </div>
      </div>
    </>
  )
} 
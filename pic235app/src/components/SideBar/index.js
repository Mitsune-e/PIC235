import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { EmpresaService } from "../../services";
import { SideBarIcon } from "./SideBarIcon";
import { faTableColumns, faSuitcase, faPeopleGroup, faFilePen, faList, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { SideBarItem } from "./SideBarItem";


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
      <div id="sidebar">
        <div className="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="side-panel" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-navy" id="offcanvasScrollingLabel">{nomeEmpresa}</h5>
          </div>
          <div className="option-row">
            <ul className="sidebar-nav">
              <SideBarItem icon={faTableColumns} path={"dashboard"} title={"Dashboard"} />
              <SideBarItem icon={faSuitcase} path={"empresa"} title={"Perfil de Empresa"} />
              <SideBarItem icon={faPeopleGroup} path={"funcoes"} title={"Funções da Empresa"} />
              <SideBarItem icon={faFilePen} path={"recurso"} title={"Cadastro de Aplicação de Recurso"} />
              <SideBarItem icon={faList} path={"projeto"} title={"Projeto"} />
              <SideBarItem icon={faUserPlus} path={"cadastro"} title={"Cadastro de Usuarios"} />
            </ul>
          </div>
          {Erro !== "" && <div className="alert alert-danger">{Erro}</div>}
        </div>
      </div>
    </>
  )
} 
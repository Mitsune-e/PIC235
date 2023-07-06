import React, { useState } from "react";
import { SideBar } from "../../components";
import "./index.css"

export const NovoProjeto = (props) => {


  return (
    <div>
      <SideBar />
      {/*To do: rename for login stuff */}
      <div className="mainbox">
        <div className="form-login border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-novoprojeto">
                <h3 className="text-navy">Novo Projeto</h3>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleProject" className="project-nm text-navy">Nome do Projeto*</label>
                <input type="name" className="project-name" id="exampleProjectName" aria-describedby="projectName" />
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionProject" className="project-desc text-navy">Descrição do Projeto</label>
                <input type="text" className="project-description" id="exampleProjectDescription" aria-describedby="projectDescription" />
              </div>

              <a href="./Projeto"><buttton name="button" className="btn-cancel">Cancelar</buttton></a>
              <button type="submit" className="btn btn-outline-teal">Ok</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

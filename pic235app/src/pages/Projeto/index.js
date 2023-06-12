import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Projeto = (props) => {


  return (
    <div>
      <Navbar />
      {/*To do: rename for login stuff */}
      <div className="mainbox">
        <div className="form-login border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-projeto">
                <h3 className="text-navy">Projeto</h3>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleProject" className="projects text-navy">Seus Projetos</label>
                <select>
                    <option>Selecione um projeto</option>
                    <option>Projeto 1</option>
                    <option>Projeto 2</option>
                    <option>Projeto 3</option>
                </select>
              </div>

              <a href="./NovoProjeto"><button type="submit" className="btn btn-outline-teal">Criar Novo Projeto</button></a>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

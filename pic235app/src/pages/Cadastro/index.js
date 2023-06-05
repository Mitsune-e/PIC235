import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Cadastro = (props) => {


  return (
    <div>
      <Navbar />
      <div className="mainbox">
        <div className="form-cadastro border border-secondary-subtle">
          <form>
            <h2>Seu primeiro acesso!</h2>
            <div className="col">
              <div className="mb-1 titulo-cadastro">
                <h3 className="text-navy">Cadastro de Usuario</h3>
              </div>
              <div className="mb-3">
                <label htmlFor="InputName" className="form-label text-navy">Nome completo</label>
                <input type="text" className="form-control round" placeholder="Nome" id="InputName" />
              </div>
              <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label text-navy">Email (este será o seu Login)</label>
                <input type="email" className="form-control round" placeholder="exemplo@email.com" id="InputEmail" />
              </div>
              <div className="mb-3">
                <label htmlFor="InputTel" className="form-label text-navy">Telefone</label>
                <input type="text" className="form-control round" placeholder="(__)_____-____" id="InputTel" />
              </div>
              <div className="alert alert-danger">
                Todos os campos são obrigatorios
              </div>
            </div >
            <button type="submit" className="btn btn-outline-teal">Cadastre-se</button>
          </form>
        </div>
      </div>
    </div>
  )
}

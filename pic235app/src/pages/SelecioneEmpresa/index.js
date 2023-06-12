import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const SelecioneEmpresa = () => {
  return (
    <div>
      <Navbar />
      {/*To do: rename for login stuff */}
      <div className="mainbox">
        <div className="form-login border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-login">
                <h3 className="text-navy"></h3>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-navy"
                >
                  Selecione a Empresa
                </label>
                <input
                  type="selecione"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label text-navy"
                >
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="alert alert-danger">
                A senha é definida pelos lideres de sua empresa
              </div>

              <button type="submit" className="btn btn-outline-teal">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Empresa = () => {

  return (
    <div>
      <Navbar />
      <div className="mainbox">
        <div className="form-cadastro border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-cadastro">
                <h3 className="text-navy">Sua empresa</h3>
              </div>
              {/* First Row */}
              <div className="form-row">
                <div className="mb-3 form-input">
                  <label htmlFor="InputNameCompany" className="form-label text-navy">Nome Fantasia</label>
                  <input type="text" className="form-control round" placeholder="Nome Fantasia" id="InputInputNameCompany" />
                </div>

                <div className="mb-3 form-input">
                  <label htmlFor="InputRazao" className="form-label text-navy">Razão Social</label>
                  <input type="text" className="form-control round" placeholder="RazaoSocial" id="InputRazao" />
                </div>
                <div className="mb-3 form-input">
                  <label htmlFor="InputCNPJ" className="form-label text-navy">CNPJ</label>
                  <input type="text" className="form-control round" placeholder="CNPJ" id="InputCNPJ" />
                </div>
              </div>
              {/* Second Row */}
              <div className="form-row">
                <div className="mb-3 form-input">
                  <label htmlFor="InputEmail" className="form-label text-navy">Email da Empresa</label>
                  <input type="email" className="form-control round" placeholder="Email" id="InputEmail" />
                </div>
                <div className="mb-3 form-input">
                  <label htmlFor="InputCompanyTel" className="form-label text-navy">Telefone</label>
                  <input type="text" className="form-control round" placeholder="(__)_____-____" id="InputCompanyTel" />
                </div>
              </div>
              {/* Third Row */}
              <div className="form-row">
                <div className="mb-3 form-input">
                  <label htmlFor="InputEndreco" className="form-label text-navy">Endereço</label>
                  <input type="text" className="form-control round" placeholder="Endereço" id="InputEndreco" />
                </div>
                <div className="mb-3 form-input">
                  <label htmlFor="InputInscricao" className="form-label text-navy">Inscrição Estadual ou Distrital</label>
                  <input type="text" className="form-control round" placeholder="Inscrição" id="InputInscricao" />
                </div>
              </div>
              {/* Fourth Row, Radio groups, Client Types */}
              <div>
                <label className="form-label text-navy">Indique o tipo de cliente mais comum de sua empresa:</label>
                <ul className="list-group">
                  <li className="list-group-item rounded-pill mb-2 darker-border">
                    <input className="form-check-input me-1" type="radio" name="TipoCliente" value={""} id="TipoCliente1" />
                    <label className="form-check-label" htmlFor="TipoCliente1">Pessoas Jurídicas (em grande quantidade; acima de 200 clientes)</label>
                  </li>
                  <li className="list-group-item rounded-pill mb-2 darker-border">
                    <input className="form-check-input me-1" type="radio" name="TipoCliente" value={""} id="TipoCliente2" />
                    <label className="form-check-label" htmlFor="TipoCliente2">Pessoas Jurídicas (em pequena quantidade; até 200 clientes)</label>
                  </li>
                  <li className="list-group-item rounded-pill mb-2 darker-border">
                    <input className="form-check-input me-1" type="radio" name="TipoCliente" value={""} id="TipoCliente3" />
                    <label className="form-check-label" htmlFor="TipoCliente3">Pessoas Físicas (em grande quantidade; acima de 200 clientes)</label>
                  </li>
                  <li className="list-group-item rounded-pill mb-2 darker-border">
                    <input className="form-check-input me-1" type="radio" name="TipoCliente" value={""} id="TipoCliente4" />
                    <label className="form-check-label" htmlFor="TipoCliente4">Pessoas Físicas (em pequena quantidade; até de 200 clientes)</label>
                  </li>
                </ul>
              </div>
              {/* Fourth Row, Radio groups, Seller or Provider */}
              <div>
                <label className="form-label text-navy">Você vende produto ou presta serviço:</label>
                <ul className="list-group">
                  <li className="list-group-item rounded-pill mb-2 darker-border" >
                    <input className="form-check-input me-1" type="radio" name="TipoEmpresa" value={""} id="TipoEmpresa1" />
                    <label className="form-check-label" htmlFor="TipoEmpresa1">Produto</label>
                  </li>
                  <li className="list-group-item rounded-pill mb-2 darker-border" >
                    <input className="form-check-input me-1" type="radio" name="TipoEmpresa" value={""} id="TipoEmpresa2" />
                    <label className="form-check-label" htmlFor="TipoEmpresa2">Serviço</label>
                  </li>
                  <li className="list-group-item rounded-pill mb-2 darker-border" >
                    <input className="form-check-input me-1" type="radio" name="TipoEmpresa" value={""} id="TipoEmpresa3" />
                    <label className="form-check-label" htmlFor="TipoEmpresa3">Ambos</label>
                  </li>
                </ul>
              </div>
              
            </div>

             {/* Five Row, Buttons*/}

            <div className="sectionButtons">
                <div className="inputSecionButtons">
                    <div className="buttonInformation">
                        <h4>Senha Para novos usuarios</h4>
                        <img src="https://files.axshare.com/gsc/DAAJBO/6e/2f/5e/6e2f5e963d294914961ba8a52987fa7a/images/empresa/u48.svg?pageId=22e58762-4d59-44a5-aa46-71d82cd49c81"></img>
                    </div>
                    <input placeholder="Aghashfg"></input>
                </div>
              <input class="buttons" id="submitButton" type="submit" value="Gerar nova senha"></input>
            </div>
          </form>
        </div>
      </div >
    </div >


  )

}
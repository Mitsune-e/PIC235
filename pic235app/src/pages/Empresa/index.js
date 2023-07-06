import React, { useState, useEffect } from "react";
import { SideBar } from "../../components";
import "./index.css"
import { UseRadio, UseReadOnlyInput } from "../../hooks";
import { EmpresaService } from "../../services";

export const Empresa = () => {

  const [Erro, setErro] = useState("");

  const [setNomeFantasia, NomeFantasiaInput] = UseReadOnlyInput("Nome Fantasia", "nome-fantasia");
  const [setRazaoSocial, RazaoSocialInput] = UseReadOnlyInput("Razão Social", "razao-social")
  const [setCNPJ, CNPJinput] = UseReadOnlyInput("CNPJ", "input-cnpj");
  const [setEmail, EmailInput] = UseReadOnlyInput("Email da Empresa", "email-empresa");
  const [setCompanyTel, CompanyTelInput] = UseReadOnlyInput("Telefone", "telefone-empresa");
  const [setEndereco, EnderecoInput] = UseReadOnlyInput("Endereço", "endereco-input");
  const [setInscricao, InscricaoInput] = UseReadOnlyInput("Inscricao", "inscricao-input");

  const [TiposCliente, setTiposCliente] = useState([]);
  const [TipoCliente, setTipoCliente] = useState("0");
  const [TiposServico, setTiposServico] = useState([]);
  const [TipoServico, setTipoServico] = useState("0");

  const [, TipoClienteRadio] = UseRadio(TiposCliente, "Tipo de cliente mais comum de sua empresa:", "tipo-cliente", "TEXTO_TPO_CLIENTE", "COD_TPO_CLIENTE", TipoCliente)
  const [, TipoServicoRadio] = UseRadio(TiposServico, "Tipo de serviço oferecido:", "tipo-empresa", "DESC_TPO_SERVICO", "COD_TPO_SERVICO", TipoServico);

  useEffect(() => {
    //useEffect to get cliente types from database
    (async () => {
      try {
        const tipoCliente = await EmpresaService.BuscarTiposCliente();
        setTiposCliente(tipoCliente);
        const tiposServicoce = await EmpresaService.BuscarTiposServico();
        setTiposServico(tiposServicoce);

        const dadosEmpresa = await EmpresaService.Buscar();

        setNomeFantasia(dadosEmpresa.NOME_FAN_EMPRESA);
        setRazaoSocial(dadosEmpresa.RAZAO_EMPRESA);
        setCNPJ(dadosEmpresa.CNPJ_EMPRESA);
        setEmail(dadosEmpresa.EMAIL_EMPRESA);
        setCompanyTel(dadosEmpresa.TEL_EMPRESA);
        setEndereco(dadosEmpresa.ENDER_EMPRESA);
        setInscricao(dadosEmpresa.INSCR_EMPRESA)
        setTipoCliente(dadosEmpresa.TD_TPO_CLIENTE_PK_TPO_CLIENTE);
        setTipoServico(dadosEmpresa.TD_TPO_SERVICO_PK_TPO_SERVICO);
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, []);


  return (
    <div>
      <SideBar />
      <div className="mainbox">
        {Erro !== "" && <div className="alert alert-danger">{Erro}</div>}

        {Erro === "" && <>
          <div className="form-cadastro border border-secondary-subtle">
            <form>
              <div className="col">
                <div className="mb-1 titulo-cadastro">
                  <h3 className="text-navy">Sua empresa</h3>
                </div>
                {/* First Row */}
                <div className="form-row">
                  {NomeFantasiaInput}

                  {RazaoSocialInput}

                  {CNPJinput}
                </div>
                {/* Second Row */}
                <div className="form-row">
                  {EmailInput}

                  {CompanyTelInput}
                </div>
                {/* Third Row */}
                <div className="form-row">
                  {EnderecoInput}
                  {/* <div className="mb-3 form-input">
                  <label htmlFor="InputInscricao" className="form-label text-navy">Inscrição Estadual ou Distrital</label>
                  <input type="text" className="form-control round" placeholder="Inscrição" id="InputInscricao" />
                </div> */}
                  {InscricaoInput}
                </div>
                {/* Fourth Row, Radio groups, Client Types */}
                {TipoClienteRadio}

                {/* Fourth Row, Radio groups, Seller or Provider */}
                {TipoServicoRadio}

              </div>
            </form>
          </div>
        </>}

      </div >
    </div >


  )

}
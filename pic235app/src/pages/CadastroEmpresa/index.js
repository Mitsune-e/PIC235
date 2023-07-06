import React, { useEffect, useState } from "react";
import { SideBar } from "../../components";
import "./index.css"
import { UseInput, UseRadio } from "../../hooks";
import { EmpresaService } from "../../services";

export const CadastroEmpresa = () => {
  const [Erro, setErro] = useState("");
  const [NomeFantasia, NomeFantasiaInput] = UseInput("Nome Fantasia", "nome-fantasia");
  const [RazaoSocial, RazaoSocialInput] = UseInput("Razão Social", "razao-social");
  const [CNPJ, CNPJInput] = UseInput("CNPJ", "cnpj");
  const [Email, EmailInput] = UseInput("Email da Empresa", "email");
  const [Telefone, TelefoneInput] = UseInput("Telefone", "telefone");
  const [Endereco, EnderecoInput] = UseInput("Endereço", "endereco");
  const [Inscricao, InscricaoInput] = UseInput("Inscrição Estadual ou Distrital", "inscricao");

  const [TiposCliente, setTiposCliente] = useState([]);
  const [TiposServico, setTiposServico] = useState([]);

  const [TipoCliente, TipoClienteRadio] = UseRadio(TiposCliente, "Indique o tipo de cliente mais comum de sua empresa:", "tipo-cliente", "TEXTO_TPO_CLIENTE", "COD_TPO_CLIENTE")

  const [TipoServico, TipoServicoRadio] = UseRadio(TiposServico, "Você vende produto ou presta serviço:", "tipo-empresa", "DESC_TPO_SERVICO", "COD_TPO_SERVICO");

  const tiposUsuario = [
    {
      key: 1,
      title: "Sim, sou o líder da empresa"
    },
    {
      key: 2,
      title: "Não, sou um representante"
    }
  ];

  const [LiderEmpresa, LiderEmpresaRadio] = UseRadio(tiposUsuario, "Líder máximo da empresa?", "lider-empresa", "title", "key")

  useEffect(() => {
    //useEffect to get cliente types from database
    (async () => {
      try {
        const tiposCliente = await EmpresaService.BuscarTiposCliente();
        setTiposCliente(tiposCliente);
        const tiposServicoce = await EmpresaService.BuscarTiposServico();
        setTiposServico(tiposServicoce);
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, []);

  async function CadastrarEmpresa(e) {
    e.preventDefault();
    setErro("");
    try {
      const dadosEmpresa = {
        nome: NomeFantasia,
        razao: RazaoSocial,
        cnpj: CNPJ,
        email: Email,
        telefone: Telefone,
        endereco: Endereco,
        inscricao: Inscricao,
        tipoCliente: TipoCliente,
        tipoServico: TipoServico
      };

      const res = await EmpresaService.Cadastrar(dadosEmpresa);
      window.alert(res);
    }
    catch (e) {
      console.log(e)
      setErro(e);
    }
  }

  return (
    <div>
      <div className="mainbox">
        <SideBar />
        <div className="form-cadastro border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-cadastro">
                <h3 className="text-navy">Cadastro Empresa</h3>
              </div>
              {/* First Row */}
              <div className="form-row">
                {NomeFantasiaInput}

                {RazaoSocialInput}

                {CNPJInput}
              </div>
              {/* Second Row */}
              <div className="form-row">
                {EmailInput}

                {TelefoneInput}
              </div>
              {/* Third Row */}
              <div className="form-row">
                {EnderecoInput}

                {InscricaoInput}
              </div>
              {/* Fourth Row, Radio groups, Client Types */}
              {TipoClienteRadio}
              {/* Fourth Row, Radio groups, Seller or Provider */}
              {TipoServicoRadio}
              {/* Fourth Row, Radio groups, Seller or Provider */}
              {LiderEmpresaRadio}
            </div>

            {/* Five Row, Buttons*/}

            <div className="sectionButtons justify-content-evenly">
              <button className="buttons" id="returnButton">
                <a href="/Login">Voltar</a>
              </button>
              <button className="buttons" id="submitButton" type="submit" onClick={CadastrarEmpresa}>Finalizar cadastro</button>
            </div>

            {Erro !== "" && <>
              <br />

              <div className="alert alert-danger">{Erro}</div>
            </>}
          </form>
        </div>
      </div >
    </div >


  )

}
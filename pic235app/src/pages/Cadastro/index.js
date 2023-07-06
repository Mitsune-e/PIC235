import React, { useEffect, useState } from "react";
import { SideBar } from "../../components";
import "./index.css";
import { UseInput, UseRadio } from "../../hooks";
import { UsuarioService } from "../../services";

export const Cadastro = () => {
  const [Erro, setErro] = useState("");
  const [Email, EmailInput] = UseInput("Email (este será o seu Login)", "email");
  const [Telefone, TelefoneInput] = UseInput("Telefone", "telefone");

  const [TiposUsuario, setTiposUsuario] = useState([]);

  const [TipoUsuario, TipoUsuarioRadio] = UseRadio(TiposUsuario, "Função/Perfil?", "funcao", "DESC_FUNCOES", "COD_FUNCOES")

  useEffect(() => {
    //useEffect to get user types from database
    (async () => {
      try {
        const tiposUsuario = await UsuarioService.BuscarFuncoesUsuario();
        setTiposUsuario(tiposUsuario);
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, []);

  async function CadastrarUsuario(e) {
    e.preventDefault();
    setErro("");
    try {
      const dadosUsuario = {
        telefone: Telefone,
        email: Email,
        codigoTipoUsuario: TipoUsuario
      }

      const res = await UsuarioService.CriarAcesso(dadosUsuario);
      window.alert(res);
    }
    catch (e) {
      console.log(e)
      setErro(e);
    }
  }

  return (
    <div>
      <SideBar />
      <div className="mainbox">
        <div className="form-cadastro border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-cadastro">
                <h3 className="text-navy">Cadastro de Usuario</h3>
              </div>
              {/*<div className="mb-3">
                <label htmlFor="InputName" className="form-label text-navy">Nome completo</label>
                <input type="text" className="form-control round" placeholder="Nome" id="InputName" />
              </div>*/}
              {EmailInput}
              {TelefoneInput}
              {TipoUsuarioRadio}
              <div className="alert alert-danger">
                Todos os campos são obrigatorios
              </div>
            </div >

            <button type="submit" className="mb-2 btn btn-outline-teal" onClick={CadastrarUsuario}>Cadastrar</button>

            {Erro !== "" && <>
              <br />

              <div className="alert alert-danger">{Erro}</div>
            </>}
          </form>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { Radio, SideBar } from "../../components";
import "./index.css"
import { UsuarioService } from "../../services";
import { DMN_FUNCOES } from "../../domains";

export const Funcoes = () => {
  const [Erro, setErro] = useState("");
  const [Usuarios, setUsuarios] = useState([]);

  const [FuncoesUsuario, setFuncoesUsuario] = useState([]);
  const [TiposUsuarios, setTiposUsuarios] = useState([]);

  useEffect(() => {
    //useEffect to get cliente types from database
    (async () => {
      try {
        await CarregarDados();
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, []);

  async function CarregarDados() {
    try {
      const usuarios = await UsuarioService.BuscarUsuariosPorEmpresa();
      setUsuarios(usuarios);

      const funcoesUsuario = await UsuarioService.BuscarTodasFuncoesUsuario();
      setFuncoesUsuario(funcoesUsuario);

      const tiposUsuarios = await UsuarioService.BuscarTiposUsuario();
      setTiposUsuarios(tiposUsuarios);
    }
    catch (e) {
      setErro(e);
    }
  }

  async function AtualizarUsuario(funcao, tipoUsuario, codigoUsuario) {
    setErro("");
    try {
      const dadosUsuario = {
        condigoFuncao: funcao,
        codigoTipoUsuario: tipoUsuario,
        codigoUsuario: codigoUsuario
      }

      const res = await UsuarioService.Atualizar(dadosUsuario);
      window.alert(res);
    }
    catch (e) {
      console.log(e)
      setErro(e);
    }
  }

  async function HandleOnChange(funcao, tipoUsuario, codigoUsuario) {
    await AtualizarUsuario(funcao, tipoUsuario, codigoUsuario);
    await CarregarDados();
  }

  return (
    <div>
      <SideBar />
      <div className="mainbox">
        <div className="container">
          {/*<div className="options-container">
            <form className="search-bar">
              <input placeholder="Pesquisar" />
              <button href="#">Pesquisar</button>
            </form>
            <div className="right-options">
              <a href="#">Perguntas Frequentes |</a>
              <a href="#">Usuário</a>
            </div>
          </div>*/}
          <div className="mb-1 titulo-cadastro">
            <h3>Usuários e Funções</h3>
          </div>
          <div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Tipo</th>
                    <th>Função</th>
                  </tr>
                </thead>
                <tbody>
                  {Usuarios.map((usuario, index) => (
                    <tr key={index}>
                      <td>{usuario.EMAIL_USUARIO}</td>
                      <td>{usuario.TEL_USUARIO}</td>
                      <td>
                        <ul className="list-group">
                          {TiposUsuarios.map((tipo, i) => {
                            return (
                              <Radio
                                key={i}
                                title={tipo.DESC_TPO_USUARIO}
                                checkedValue={usuario.FK_TPO_USUARIO}
                                name={`tipos-${index}`}
                                id={`tipos-${index}-${i + 1}`}
                                value={`${tipo.COD_TPO_USUARIO}`}
                                onChange={async () => HandleOnChange(usuario.FK_FUNCOES, tipo.COD_TPO_USUARIO, usuario.COD_USUARIO)}
                              />
                            )
                          })}
                        </ul>
                      </td>
                      <td>
                        <ul className="list-group">
                          {FuncoesUsuario.map((funcao, i) => {
                            return (
                              <Radio
                                key={i}
                                title={funcao.DESC_FUNCOES}
                                checkedValue={usuario.FK_FUNCOES}
                                name={`funcoes-${index}`}
                                id={`funcoes-${index}-${i + 1}`}
                                value={`${funcao.COD_FUNCOES}`}
                                onChange={async () => HandleOnChange(funcao.COD_FUNCOES, usuario.FK_TPO_USUARIO, usuario.COD_USUARIO)}
                                disabled={usuario.FK_FUNCOES === DMN_FUNCOES.LIDER_MAXIO || funcao.COD_FUNCOES === DMN_FUNCOES.LIDER_MAXIO}
                              />
                            )
                          })}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {Erro !== "" && <>
            <br />

            <div className="alert alert-danger">{Erro}</div>
          </>}
        </div>
      </div>
    </div>
  )
}

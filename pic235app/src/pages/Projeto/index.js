import React, { useEffect, useState } from "react";
import { SideBar } from "../../components";
import "./index.css"
import { ProjetoService } from "../../services";
import { UseInput } from "../../hooks";

export const Projeto = () => {
  const [Erro, setErro] = useState("");

  const [Nome, NomeInput] = UseInput("Nome do projeto", "nome");
  const [Descricao, DescricaoInput] = UseInput("Descrição do projeto", "descricao");
  const [Projetos, setProjetos] = useState([]);

  useEffect(() => {
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
      const projetos = await ProjetoService.BuscarPorEmpresa();
      setProjetos(projetos);
    }
    catch (e) {
      setErro(e);
    }
  }

  async function CadastrarProjeto(e) {
    e.preventDefault();
    setErro("");
    try {
      const dados = {
        nome: Nome,
        descricao: Descricao
      }

      const res = await ProjetoService.Cadastrar(dados);
      window.alert(res);

      await CarregarDados();
    }
    catch (e) {
      console.log(e)
      setErro(e)
    }
  }

  async function Deletar(e, codigo) {
    e.preventDefault();
    setErro("");
    try {
      const dados = {
        codigoProjeto: codigo,
      }

      const res = await ProjetoService.Deletar(dados);
      window.alert(res);

      await CarregarDados();
    }
    catch (e) {
      console.log(e)
      setErro(e)
    }
  }

  return (
    <div>
      <SideBar />
      {/*To do: rename for login stuff */}
      <div className="mainbox">
        <div className="form-login border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-projeto">
                <h3 className="text-navy">Projetos da sua Empresa</h3>
              </div>

              <div>
                {Projetos.length > 0 && <>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Descrição</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Projetos.map((projeto, index) => (
                          <tr key={index}>
                            <td>{projeto.NOM_PROJETO}</td>
                            <td>{projeto.DESC_PROJETO}</td>
                            <td>
                              <button className="mb-2 btn btn-outline-danger" onClick={async (e) => Deletar(e, projeto.COD_PROJETO)}>Deletar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>}

                {Projetos.length === 0 && <>
                  <div className="alert alert-info">{"Nenhum projeto cadastrado no momento."}</div>
                </>}
              </div>

              <div className="mb-1 titulo-projeto">
                <h3 className="text-navy">Cadastrar novo Projeto</h3>
              </div>

              <div>
                {NomeInput}
                {DescricaoInput}
                <div className="alert alert-danger">
                  Todos os campos são obrigatorios
                </div>

                <button type="submit" className="mb-2 btn btn-outline-teal" onClick={CadastrarProjeto}>Cadastrar</button>

              </div>
              {Erro !== "" && <>
                <br />

                <div className="alert alert-danger">{Erro}</div>
              </>}
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

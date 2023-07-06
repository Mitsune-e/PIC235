import React, { useState, useEffect } from "react";
import { SideBar } from "../../components";
import "./index.css"
import { CustosService, ProjetoService } from "../../services";

export const Dashboard = () => {
  const [Erro, setErro] = useState("");


  const [Projetos, setProjetos] = useState([]);
  const [Custos, setCustos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await CarregarCustos();
        await CarregarProjetos();
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, [])

  async function CarregarCustos() {
    try {
      const custos = await CustosService.BuscarPorEmpresa();
      setCustos(custos)
    }
    catch (e) {
      setErro(e);
    }
  }

  async function CarregarProjetos() {
    try {
      const projetos = await ProjetoService.BuscarPorEmpresa();
      setProjetos(projetos);
    }
    catch (e) {
      setErro(e);
    }
  }

  return (
    <div>
      <SideBar />
      <div className="mainbox">
        <div className="form-custos-cadastrados border border-secondary-subtle">
          <form>
            <div className="form-row">
              <div className="col">
                <div className="mb-1 titulo-projeto">
                  <h3 className="text-navy">Custos da sua Empresa</h3>
                </div>
                <div>
                  {Custos.length > 0 && <>
                    <div className="table-responsive">
                      {/* Expenses table */}
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Descricao</th>
                            <th>Projeto</th>
                            <th>Valor</th>
                            <th>Unidade</th>
                            <th>Descrição Unidade</th>
                            <th>Data Inicial</th>
                            <th>Data Final</th>
                            <th>Tipo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Custos.map((custo, index) => (
                            <tr key={index}>
                              <td>{custo.DESC_CUSTOS}</td>
                              <td>{custo.DESC_PROJETO}</td>
                              <td>{custo.VALOR_CUSTOS}</td>
                              <td>{custo.UNID_CUSTOS}</td>
                              <td>{custo.DESC_TPO_UNIDADE}</td>
                              <td>{custo.VIGENCIA_TO_CUSTOS}</td>
                              <td>{custo.VIGENCIA_ATE_CUSTOS}</td>
                              <td>{custo.DESC_TPO_CUSTO}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>}

                  {Custos.length === 0 && <>
                    <div className="alert alert-info">{"Nenhum custo cadastrado no momento."}</div>
                  </>}
                </div>
                <div id="custo-table">
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
                            </tr>
                          </thead>
                          <tbody>
                            {Projetos.map((projeto, index) => (
                              <tr key={index}>
                                <td>{projeto.NOM_PROJETO}</td>
                                <td>{projeto.DESC_PROJETO}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

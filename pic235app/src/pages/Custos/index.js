import React, { useState, useEffect } from "react";
import { SideBar } from "../../components";
import "./index.css";
import { UseDropBox, UseInput, UseRadio } from "../../hooks";
import { CustosService, ProjetoService } from "../../services";


export const Custos = (props) => {
  const [Erro, setErro] = useState("");

  const [Descricao, DescricaoInput] = UseInput("Descrição do Custo", "descricao-custo");
  const [Unidade, UnidadeInput] = UseInput("Unidade", "unidade");
  const [Valor, ValorInput] = UseInput("Valor", "valor-input");
  const [VigenciaInicio, VigenciaInput] = UseInput("Vigência a partir de:", "VigenciaInicio-Input", "date");
  const [VigenciaFim, VingenciaFimInput] = UseInput("Vigência até:", "VigenciaFim-Input", "date");

  const [TiposClassificao, setTiposClassificao] = useState([]);
  const [TiposCusto, setTiposCusto] = useState([]);
  const [Projetos, setProjetos] = useState([]);
  const [Custos, setCustos] = useState([]);

  const [Classificacao, ClassificacaoDropBox] = UseDropBox(TiposClassificao, "Classificação da Unidade", "classificacao-dropbox", "COD_TPO_UNIDADE", "DESC_TPO_UNIDADE")
  const [Projeto, ProjetoDropBox] = UseDropBox(Projetos, "Custo de Projeto ou Empresa?", "projeto", "COD_PROJETO", "NOM_PROJETO");

  const [TipoCusto, TipoCustoRadio] = UseRadio(TiposCusto, "Tipo do Custo", "tipo-custo", "DESC_TPO_CUSTO", "COD_TPO_CUSTO", null, true);

  useEffect(() => {
    (async () => {
      try {
        await CarregarDados();
        await CarregarCustos();
      }
      catch (e) {
        setErro(e);
      }
    })()
  }, [])

  async function CarregarDados() {
    try {
      const TiposClassificao = await CustosService.BuscarTipoClassificao();
      setTiposClassificao(TiposClassificao);
      const TiposCusto = await CustosService.BuscarTipoCusto();
      setTiposCusto(TiposCusto);
      const projetos = await ProjetoService.BuscarPorEmpresa();

      const projetoVazio = {
        NOM_PROJETO: "Custo da empresa",
        COD_PROJETO: 0
      };

      if (projetos === "") {
        setProjetos([projetoVazio]);
      }
      else {
        projetos.push(projetoVazio);

        setProjetos(projetos);
      }
    }
    catch (e) {
      setErro(e);
    }
  }

  async function CarregarCustos() {
    try {
      const custos = await CustosService.BuscarPorEmpresa();
      setCustos(custos)
    }
    catch (e) {
      setErro(e);
    }
  }

  async function Cadastrar(e) {
    e.preventDefault();
    setErro("");
    try {
      const dados = {
        descricao: Descricao,
        unidade: Unidade,
        valor: Valor,
        dataInicial: VigenciaInicio,
        datafinal: VigenciaFim,
        codigoProjeto: Projeto,
        codigoUnidade: Classificacao,
        codigoTipoCusto: TipoCusto
      }

      const res = await CustosService.Cadastrar(dados);
      window.alert(res);

      await CarregarCustos();
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
      console.log(codigo)
      const dados = {
        codigoCusto: codigo,
      }

      const res = await CustosService.Deletar(dados);
      window.alert(res);

      await CarregarCustos();
    }
    catch (e) {
      console.log(e)
      setErro(e)
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
                <h3 className="text-navy">Cadastro de Custos</h3>
              </div>

              <div className="form-row">
                {DescricaoInput}

                {ClassificacaoDropBox}

                {UnidadeInput}
              </div>

              <div className="form-row">
                {ValorInput}

                {VigenciaInput}

                {VingenciaFimInput}
              </div>

              <div className="form-row">
                {ProjetoDropBox}
              </div>

              <div className="form-row">
                {TipoCustoRadio}
              </div>

            </div>

            <div className="sectionButtons justify-content-evenly">
              <button className="buttons" id="submitButton" type="submit" onClick={Cadastrar}>Adicionar Custo</button>
            </div>

            {Erro !== "" && <>
              <br />

              <div className="alert alert-danger">{Erro}</div>
            </>}

            <div className="mb-1 titulo-projeto">
              <h3 className="text-navy">Custos da sua Empresa</h3>
            </div>

            <div>
              {Custos.length > 0 && <>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Projeto</th>
                        <th>Valor</th>
                        <th>Unidade</th>
                        <th>Descrição Unidade</th>
                        <th>Data Inicial</th>
                        <th>Data Final</th>
                        <th>Tipo</th>
                        <th></th>
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
                          <td>
                            <button className="mb-2 btn btn-outline-danger" onClick={async (e) => Deletar(e, custo.COD_CUSTOS)}>Deletar</button>
                          </td>
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
          </form>
        </div>
      </div>
    </div>
  );
};

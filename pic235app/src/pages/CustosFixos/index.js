import React, { useState, useEffect } from "react";
import { Navbar } from "../../components";
import "./index.css";
import { UseDropBox, UseInput, UseRadio } from "../../hooks";


export const CustosFixos = (props) => {
  const [Erro, setErro] = useState("");

  const [custosFixos, setCustosFixos] = useState([]);

  const [classificacao, setClassificacao] = useState("mes");

  /* const [vigenciaInicio, setVigenciaInicio] = useState("");
  const [vigenciaFim, setVigenciaFim] = useState("");
 */
  const [Descricao, DescricaoInput] = UseInput("Descrição do Custo", "descricao-custo");
  const [Unidade, UnidadeInput] = UseInput("Unidade", "unidade");
  const [Valor, ValorInput] = UseInput("Valor", "valor-input");
  const [VigenciaInicio, VigenciaInput] = UseInput("Vigência a partir de:", "VigenciaInicio-Input", "date");
  const [VigenciaFim, VingenciaFimInput] = UseInput("Vigência até:", "VigenciaFim-Input", "date");

  const exemploDropBox = [
    {
      title: "mes",
      value: "1",


    },
    {
      title: "ano",
      value: "2",
    },
    {
      title: "dia",
      value: "3",
    }
  ]

  const [Classificacao, ClassificacaoDropBox] = UseDropBox(exemploDropBox, "Classificação da Unidade", "classificacao-dropbox", "value", "title")

  const exemplosTiposCusto = [
    {
      title: "Variável",
      value: "1"
    },
    {
      title: "Fixo",
      value: "2"
    },
    {
      title: "Investimento",
      value: "3"
    }
  ]

  const [TipoCusto, TipoCustoRadio] = UseRadio(exemploDropBox, "Tipo do Custo", "tipo-custo", "title", "value", null, true);

  useEffect(() => {

  }, [])

  return (
    <div>
      <Navbar />

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
                {TipoCustoRadio}
              </div>

            </div>

            <div className="sectionButtons justify-content-evenly">
              <button className="buttons" id="submitButton" type="submit" onClick={() => { }}>Adicionar Custo</button>
            </div>
          </form>
        </div>
      </div>














      <table className="custos-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Classificação</th>
            <th>Unidade</th>
            <th>Valor</th>
            <th>Vigência a partir de:</th>
            <th>Vigência até:</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {custosFixos.map((custo) => (
            <tr key={custo.id}>
              <td>{custo.descricao}</td>
              <td>{custo.classificacao}</td>
              <td>{custo.unidade}</td>
              <td>{custo.valor}</td>
              <td>{custo.vigenciaInicio}</td>
              <td>{custo.vigenciaFim}</td>
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

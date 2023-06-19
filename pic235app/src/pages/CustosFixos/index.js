import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css";

export const CustosFixos = (props) => {
  const [custosFixos, setCustosFixos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [classificacao, setClassificacao] = useState("mes");
  const [unidade, setUnidade] = useState("");
  const [valor, setValor] = useState("");
  const [vigenciaInicio, setVigenciaInicio] = useState("");
  const [vigenciaFim, setVigenciaFim] = useState("");

  // Função para adicionar um novo custo fixo
  const adicionarCustoFixo = () => {
    const novoCusto = {
      id: custosFixos.length + 1,
      descricao: descricao,
      classificacao: classificacao,
      unidade: unidade,
      valor: valor,
      vigenciaInicio: vigenciaInicio,
      vigenciaFim: vigenciaFim,
    };

    setCustosFixos([...custosFixos, novoCusto]);

    // Limpar os campos após adicionar o custo fixo
    setDescricao("");
    setClassificacao("mes");
    setUnidade("");
    setValor("");
    setVigenciaInicio("");
    setVigenciaFim("");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        
        <div className="content">
          <div className="bullets">
            <span className="bullet">1</span>
            <hr className="bullet-line" />
            <span className="bullet">2</span>
            <hr className="bullet-line" />
            <span className="bullet">3</span>
            <hr className="bullet-line" />
            <span className="bullet">4</span>
          </div>

          <div className="bullet-labels">
            <span id="lblB1" className="bullet-label">
              Custos Fixos
            </span>
            <span id="lblB2" className="bullet-label">
              Custos Variáveis
            </span>
            <span id="lblB3" className="bullet-label">?</span>
            <span id="lblB4" className="bullet-label">
              Enviar Solicitação
            </span>
          </div>

          <div className="input-container">
            <div className="input-group">
              <label htmlFor="descricao">Descrição do Custo</label>
              <input
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="classificacao">Classificação da Unidade</label>
              <select
                id="classificacao"
                value={classificacao}
                onChange={(e) => setClassificacao(e.target.value)}
              >
                <option value="mes">Mês</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="unidade">Unidade</label>
              <input
                type="text"
                id="unidade"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="valor">Valor</label>
              <input
                type="number"
                id="valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="vigencia-inicio">Vigência a partir de:</label>
              <input
                type="date"
                id="vigencia-inicio"
                value={vigenciaInicio}
                onChange={(e) => setVigenciaInicio(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="vigencia-fim">Vigência até:</label>
              <input
                type="date"
                id="vigencia-fim"
                value={vigenciaFim}
                onChange={(e) => setVigenciaFim(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <button onClick={adicionarCustoFixo}>Adicionar</button>
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
      </div>
    </div>
  );
};

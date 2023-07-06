const Connection = (require("../helpers/connection")).Connection;

async function BuscarTipoClassificao(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_TPO_UNIDADE, DESC_TPO_UNIDADE FROM TD_TPO_UNIDADE";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhum tipo de classifição cadastrada.");
      return;
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (result.length > 0) {
      return res.end(JSON.stringify(result))
    }
    else {
      return res.end(error)
    }
  }
}

async function BuscarTipoCusto(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_TPO_CUSTO, DESC_TPO_CUSTO FROM TD_TPO_CUSTO";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhum tipo de custo cadastrado.");
      return;
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (result.length > 0) {
      return res.end(JSON.stringify(result))
    }
    else {
      return res.end(error)
    }
  }
}

async function BuscarPorEmpresa(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    const user = req.user;
    connection = await Connection.Connect();

    const selectEmpresa = `SELECT PK_EMPRESA FROM TB_EMPRESA E INNER JOIN TD_TPO_CLIENTE C INNER JOIN TD_TPO_SERVICO S INNER JOIN TA_USUARIO_EMP UE INNER JOIN TB_USUARIO U WHERE E.TD_TPO_CLIENTE_PK_TPO_CLIENTE = C.PK_TPO_CLIENTE AND E.TD_TPO_SERVICO_PK_TPO_SERVICO = S.PK_TPO_SERVICO AND E.PK_EMPRESA = UE.FK_EMPRESA AND U.PK_USUARIO = UE.FK_USUARIO AND U.COD_USUARIO = ${user.CodigoUsuario}`;

    const resultEmpresa = await Connection.Query(connection, selectEmpresa);

    if (resultEmpresa !== null && resultEmpresa.length === 0) {
      statusCode = 400;
      error = ("Nenhum dado da sua empresa cadastrado.");
      return;
    }

    const codigoEmpresa = resultEmpresa[0].PK_EMPRESA;

    const select = `SELECT COD_CUSTOS, DESC_CUSTOS, VALOR_CUSTOS, UNID_CUSTOS, CASE WHEN VIGENCIA_TO_CUSTOS IS NULL THEN '-' ELSE VIGENCIA_TO_CUSTOS END AS VIGENCIA_TO_CUSTOS, CASE WHEN VIGENCIA_ATE_CUSTOS IS NULL THEN '-' ELSE VIGENCIA_ATE_CUSTOS END AS VIGENCIA_ATE_CUSTOS, CASE WHEN DESC_PROJETO IS NULL THEN 'Custo da Empresa' ELSE DESC_PROJETO END AS DESC_PROJETO, DESC_TPO_UNIDADE, DESC_TPO_CUSTO FROM TB_CUSTOS C LEFT OUTER JOIN TB_PROJETO P ON C.FK_PROJETO = P.PK_PROJETO INNER JOIN TD_TPO_UNIDADE TU INNER JOIN TD_TPO_CUSTO TC WHERE C.FK_UNIDADE = TU.PK_TPO_UNIDADE AND C.FK_CUSTO = TC.PK_TPO_CUSTO AND C.FK_EMPRESA = ${codigoEmpresa}`;

    result = await Connection.Query(connection, select);
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (error === null) {
      return res.end(JSON.stringify(result))
    }
    else {
      return res.end(error)
    }
  }
}

//

async function Cadastrar(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const dadosCusto = req.body;


    if (dadosCusto.codigoUnidade === "" || dadosCusto.codigoUnidade === null || dadosCusto.codigoUnidade === undefined) {
      statusCode = 400;
      error = "O campo de Classificação é obrigatório.";
      return;
    }

    const user = req.user;
    const codigoProjeto = (`${dadosCusto.codigoProjeto}` === "" || `${dadosCusto.codigoProjeto}` === "0") ? "null" : dadosCusto.codigoProjeto;
    const dataInicial = (dadosCusto.dataInicial === "" || dadosCusto.dataInicial === null || dadosCusto.dataInicial === undefined) ? null : `'${dadosCusto.dataInicial}'`;
    const dataFinal = (dadosCusto.dataFinal === "" || dadosCusto.dataFinal === null || dadosCusto.dataFinal === undefined) ? null : `'${dadosCusto.dataFinal}'`;

    const valor = `${dadosCusto.valor}`.replace(".", "").replace(",", ".");

    const select = `SELECT PK_EMPRESA FROM TB_EMPRESA E INNER JOIN TD_TPO_CLIENTE C INNER JOIN TD_TPO_SERVICO S INNER JOIN TA_USUARIO_EMP UE INNER JOIN TB_USUARIO U WHERE E.TD_TPO_CLIENTE_PK_TPO_CLIENTE = C.PK_TPO_CLIENTE AND E.TD_TPO_SERVICO_PK_TPO_SERVICO = S.PK_TPO_SERVICO AND E.PK_EMPRESA = UE.FK_EMPRESA AND U.PK_USUARIO = UE.FK_USUARIO AND U.COD_USUARIO = ${user.CodigoUsuario}`;

    result = await Connection.Query(connection, select);

    if (result !== null && result.length === 0) {
      statusCode = 400;
      error = ("Nenhum dado da sua empresa cadastrado.");
      return;
    }

    const codigoEmpresa = result[0].PK_EMPRESA;

    const resultCodigoCusto = await Connection.Query(connection, "SELECT MAX(COD_CUSTOS) AS 'CODIGO' FROM TB_CUSTOS");
    let codigoCusto = 0;

    if (resultCodigoCusto.length > 0)
      codigoCusto = resultCodigoCusto[0].CODIGO;

    codigoCusto = codigoCusto + 1;

    const insert = `INSERT INTO TB_CUSTOS (COD_CUSTOS, DESC_CUSTOS, FK_PROJETO, FK_UNIDADE, UNID_CUSTOS, VALOR_CUSTOS, VIGENCIA_TO_CUSTOS, VIGENCIA_ATE_CUSTOS, FK_EMPRESA, FK_CUSTO) VALUES (${codigoCusto}, '${dadosCusto.descricao}', (SELECT PK_PROJETO FROM TB_PROJETO WHERE COD_PROJETO = ${codigoProjeto}), ${dadosCusto.codigoUnidade}, ${dadosCusto.unidade}, ${valor}, ${dataInicial}, ${dataFinal}, ${codigoEmpresa}, ${dadosCusto.codigoTipoCusto})`;
    console.log(insert)
    result = await Connection.Query(connection, insert);

    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao cadastrar o custo. Favor tente novamente mais tarde.";
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (error === null) {
      return res.end(JSON.stringify("Custo cadastrado com sucesso."))
    }
    else {
      return res.end(error)
    }
  }
}

async function Deletar(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const codigoCusto = req.body.codigoCusto;
    console.log(codigoCusto);
    console.log(req.body);

    const deleteQ = `DELETE FROM TB_CUSTOS WHERE COD_CUSTOS = ${codigoCusto}`;
    console.log(deleteQ)
    result = await Connection.Query(connection, deleteQ);

    if (result === null) {
      statusCode = 400;
      error = ("Houve um erro ao deletar o custo.");
      return;
    }

  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (error === null) {
      return res.end(JSON.stringify("Custo deletado com sucesso."))
    }
    else {
      return res.end(error)
    }
  }
}

module.exports = {
  BuscarTipoClassificao,
  BuscarTipoCusto,
  BuscarPorEmpresa,
  Cadastrar,
  Deletar
}
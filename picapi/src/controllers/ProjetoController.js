const Connection = (require("../helpers/connection")).Connection;

async function BuscarPorEmpresa(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    const user = req.user;

    connection = await Connection.Connect();

    const select = `SELECT COD_PROJETO, NOM_PROJETO, DESC_PROJETO FROM TB_PROJETO P INNER JOIN TB_EMPRESA E INNER JOIN TD_TPO_CLIENTE C INNER JOIN TD_TPO_SERVICO S INNER JOIN TA_USUARIO_EMP UE INNER JOIN TB_USUARIO U WHERE P.FK_EMPRESA = E.PK_EMPRESA AND E.TD_TPO_CLIENTE_PK_TPO_CLIENTE = C.PK_TPO_CLIENTE AND E.TD_TPO_SERVICO_PK_TPO_SERVICO = S.PK_TPO_SERVICO AND E.PK_EMPRESA = UE.FK_EMPRESA AND U.PK_USUARIO = UE.FK_USUARIO AND U.COD_USUARIO = ${user.CodigoUsuario}`;

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

async function Cadastrar(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const nomeProjeto = req.body.nome;
    const descricaoProjeto = req.body.descricao;
    const user = req.user;

    const select = `SELECT PK_EMPRESA FROM TB_EMPRESA E INNER JOIN TD_TPO_CLIENTE C INNER JOIN TD_TPO_SERVICO S INNER JOIN TA_USUARIO_EMP UE INNER JOIN TB_USUARIO U WHERE E.TD_TPO_CLIENTE_PK_TPO_CLIENTE = C.PK_TPO_CLIENTE AND E.TD_TPO_SERVICO_PK_TPO_SERVICO = S.PK_TPO_SERVICO AND E.PK_EMPRESA = UE.FK_EMPRESA AND U.PK_USUARIO = UE.FK_USUARIO AND U.COD_USUARIO = ${user.CodigoUsuario}`;

    result = await Connection.Query(connection, select);

    if (result !== null && result.length === 0) {
      statusCode = 400;
      error = ("Nenhum dado da sua empresa cadastrado.");
      return;
    }

    const codigoEmpresa = result[0].PK_EMPRESA;

    const resultCodigoProjeto = await Connection.Query(connection, "SELECT MAX(COD_PROJETO) AS 'CODIGO' FROM TB_PROJETO");
    let codigoProjeto = 0;

    if (resultCodigoProjeto.length > 0)
      codigoProjeto = resultCodigoProjeto[0].CODIGO;

    codigoProjeto = codigoProjeto + 1;

    const insert = `INSERT INTO TB_PROJETO (COD_PROJETO, NOM_PROJETO, DESC_PROJETO, FK_EMPRESA) VALUES (${codigoProjeto}, '${nomeProjeto}', '${descricaoProjeto}', ${codigoEmpresa})`;
    console.log(insert)
    result = await Connection.Query(connection, insert);

    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao criar o projeto. Favor tente novamente mais tarde.";
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (error === null) {
      return res.end(JSON.stringify("Projeto cadastrado com sucesso."))
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

    const codigoProjeto = req.body.codigoProjeto;

    const deleteQ = `DELETE FROM TB_PROJETO WHERE COD_PROJETO = ${codigoProjeto}`;

    result = await Connection.Query(connection, deleteQ);

    if (result === null) {
      statusCode = 400;
      error = ("Houve um erro ao deletar o projeto.");
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
      return res.end(JSON.stringify("Projeto deletado com sucesso."))
    }
    else {
      return res.end(error)
    }
  }
}

module.exports = {
  BuscarPorEmpresa,
  Cadastrar,
  Deletar
}
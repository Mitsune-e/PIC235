
const Connection = (require("../helpers/connection")).Connection;

async function Cadastrar(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    // Gets the user token
    //const user = req.user;

    connection = await Connection.Connect();

    const empresa = req.body;

    const resultCodigo = await Connection.Query(connection, "SELECT MAX(COD_EMPRESA) AS CODIGO FROM TB_EMPRESA");
    let codigoEmpresa = 0;

    if (resultCodigo.length > 0)
      codigoEmpresa = resultCodigo[0].CODIGO;

    codigoEmpresa = codigoEmpresa + 1;

    const insert = `INSERT INTO TB_EMPRESA (COD_EMPRESA, NOME_FAN_EMPRESA, RAZAO_EMPRESA, CNPJ_EMPRESA, EMAIL_EMPRESA, TEL_EMPRESA, ENDER_EMPRESA, INSCR_EMPRESA, TD_TPO_CLIENTE_PK_TPO_CLIENTE, TD_TPO_SERVICO_PK_TPO_SERVICO) VALUES(${codigoEmpresa}, '${empresa.nome}', '${empresa.razao}', '${empresa.cnpj}', '${empresa.email}', '${empresa.telefone}', '${empresa.endereco}', '${empresa.inscricao}', ${empresa.tipoCliente}, ${empresa.tipoServico})`;

    result = await Connection.Query(connection, insert);

    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao criar a empresa. Favor tente novamente mais tarde.";
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (result !== null) {
      return res.end(JSON.stringify("Empresa criada com sucesso."))
    }
    else {
      return res.end(error)
    }
  }
}

async function BuscarTipoCliente(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_TPO_CLIENTE, TEXTO_TPO_CLIENTE FROM TD_TPO_CLIENTE";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhum tipo de cliente cadastrado.");
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

async function BuscarTipoServico(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_TPO_SERVICO, DESC_TPO_SERVICO FROM TD_TPO_SERVICO";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhum tipo de cliente cadastrado.");
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

module.exports = {
  Cadastrar,
  BuscarTipoCliente,
  BuscarTipoServico
}
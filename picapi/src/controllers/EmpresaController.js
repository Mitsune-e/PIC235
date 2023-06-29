const bcrypt = require("bcrypt");
const Connection = (require("../helpers/connection")).Connection;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

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

    // Generates a password has fdor string "123", check how to generate the password for real later
    const senha = await bcrypt.hash("123", SALT_ROUNDS);

    const resultCodigoUsuario = await Connection.Query(connection, "SELECT MAX(COD_USUARIO) AS 'CODIGO' FROM TB_USUARIO");
    let codigoUsuario = 0;

    if (resultCodigoUsuario.length > 0)
      codigoUsuario = resultCodigoUsuario[0].CODIGO;

    codigoUsuario = codigoUsuario + 1;

    // Runs the insert statement
    const insertUsuario = `INSERT INTO TB_USUARIO (FK_TPO_USUARIO, COD_USUARIO, TEL_USUARIO, EMAIL_USUARIO, SNA_USUARIO) VALUES (1, '${codigoUsuario}', '${empresa.telefone}', '${empresa.email}', '${senha}')`;

    result = await Connection.Query(connection, insertUsuario);

    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao criar o usuário da empresa. Favor tente novamente mais tarde.";
    }

    const insertTaUsuarioEmp = `INSERT INTO TA_USUARIO_EMP (FK_USUARIO, FK_EMPRESA, FK_FUNCOES) VALUES ((SELECT PK_USUARIO FROM TB_USUARIO WHERE COD_USUARIO = ${codigoUsuario}), (SELECT PK_EMPRESA FROM TB_EMPRESA WHERE COD_EMPRESA = ${codigoEmpresa}), 1)`

    result = await Connection.Query(connection, insertTaUsuarioEmp);

    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao vincular o usuário da empresa. Favor tente novamente mais tarde.";
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (error === null) {
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

async function BuscarDados(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const user = req.user;

    const select = `SELECT NOME_FAN_EMPRESA, RAZAO_EMPRESA, CNPJ_EMPRESA, EMAIL_EMPRESA, TEL_EMPRESA, ENDER_EMPRESA, INSCR_EMPRESA, TD_TPO_CLIENTE_PK_TPO_CLIENTE, TD_TPO_SERVICO_PK_TPO_SERVICO FROM TB_EMPRESA E INNER JOIN TD_TPO_CLIENTE C INNER JOIN TD_TPO_SERVICO S INNER JOIN TA_USUARIO_EMP UE INNER JOIN TB_USUARIO U WHERE E.TD_TPO_CLIENTE_PK_TPO_CLIENTE = C.PK_TPO_CLIENTE AND E.TD_TPO_SERVICO_PK_TPO_SERVICO = S.PK_TPO_SERVICO AND E.PK_EMPRESA = UE.FK_EMPRESA AND U.PK_USUARIO = UE.FK_USUARIO AND U.COD_USUARIO = ${user.CodigoUsuario}`;

    result = await Connection.Query(connection, select);

    if (result !== null && result.length === 0) {
      statusCode = 400;
      error = ("Nenhum dado da sua empresa cadastrado.");
      return;
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (result !== null && result.length > 0) {
      return res.end(JSON.stringify(result[0]))
    }
    else {
      return res.end(error)
    }
  }
}

module.exports = {
  Cadastrar,
  BuscarTipoCliente,
  BuscarTipoServico,
  BuscarDados
}
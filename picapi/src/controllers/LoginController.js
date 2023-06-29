const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Connection = (require("../helpers/connection")).Connection;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

async function Login(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let token = null;
  let connection;

  try {
    // Connects to the DB
    connection = await Connection.Connect();
    /*
      Gets the user data for login, ex:
      {
        email: "example@server.com",
        senha: "123"
      }
    */
    const user = req.body;

    const select = `SELECT U.COD_USUARIO, U.EMAIL_USUARIO, U.TEL_USUARIO, U.SNA_USUARIO, T.COD_TPO_USUARIO FROM TB_USUARIO U INNER JOIN TD_TPO_USUARIO T WHERE U.FK_TPO_USUARIO = T.PK_TPO_USUARIO AND U.EMAIL_USUARIO = '${user.email}'`;
    // console.log({ select });
    result = await Connection.Query(connection, select);
    const userEncontrado = result[0];

    if (result.length === 0) {
      statusCode = 400;
      error = ("Usuário ou senha incorretos.");
      return;
    }

    const isLogged = await bcrypt.compare(user.senha, userEncontrado.SNA_USUARIO);
    statusCode = isLogged ? 200 : 403;

    if (isLogged) {
      token = jwt.sign(
        {
          CodigoUsuario: userEncontrado.COD_USUARIO,
          TipoUsuario: userEncontrado.COD_TPO_USUARIO,
        },
        process.env.TOKEN_KEY
      );
    }
    else {
      error = ("Usuário ou senha incorretos.")
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  finally {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    if (token !== null) {
      return res.end(JSON.stringify(token))
    }
    else {
      return res.end(error)
    }
  }
}

async function GerarAcessoAdmin(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    // Connects to the DB
    connection = await Connection.Connect();
    // Get the user data from the HTTP query
    const senhaAdmin = req.query.senhaAdmin;

    if (senhaAdmin !== "PICADMIN") {
      throw "Acesso Inválido.";
    }

    const telefone = req.query.telefone;
    const email = req.query.email;

    // Generates a password has fdor string "123", check how to generate the password for real later
    const senha = await bcrypt.hash("123", SALT_ROUNDS);

    const resultCodigo = await Connection.Query(connection, "SELECT MAX(COD_USUARIO) AS 'CODIGO' FROM TB_USUARIO");
    let codigoUsuario = 0;

    if (resultCodigo.rowsAffected > 0)
      codigoUsuario = resultCodigo.recordset[0].CODIGO;

    codigoUsuario = codigoUsuario + 1;

    // Runs the insert statement
    const insert = `INSERT INTO TB_USUARIO (FK_TPO_USUARIO, COD_USUARIO, TEL_USUARIO, EMAIL_USUARIO, SNA_USUARIO) VALUES (3, '${codigoUsuario}', '${telefone}', '${email}', '${senha}')`;
    // console.log(insert);
    result = await Connection.Query(connection, insert);

    // Checks if the insert was successful
    if (result !== null) {
      statusCode = 400;
      error = "Houve um erro ao criar o usuário. Favor tente novamente mais tarde.";
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  // Finally statements runs after botrh try and catch blocks regardless
  finally {
    // Closes the DB connection
    // Connection.Connection.Disconnect(connection);

    // Writes the response head
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    // if there is a result that means the insert was successful, write back to the user
    if (error === null) {
      return res.end(JSON.stringify("Usuário criado com sucesso. Utilize senha 123"));
    }
    // reports errors if any happens
    else {
      return res.end(error)
    }
  }
}

async function GerarAcesso(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    // Connects to the DB
    connection = await Connection.Connect();
    // Get the user data from the HTTP query
    console.log(req.body)
    const telefone = req.body.telefone;
    const email = req.body.email;
    const codigoTipoUsuario = req.body.codigoTipoUsuario;
    const codigoUsuarioAtual = req.user.CodigoUsuario;

    // Generates a password has fdor string "123", check how to generate the password for real later
    const senha = await bcrypt.hash("123", SALT_ROUNDS);

    const resultCodigo = await Connection.Query(connection, "SELECT MAX(COD_USUARIO) AS 'CODIGO' FROM TB_USUARIO");
    let codigoUsuario = 0;

    if (resultCodigo.length > 0)
      codigoUsuario = resultCodigo[0].CODIGO;

    codigoUsuario = codigoUsuario + 1;

    const resultCodigoEmpresa = await Connection.Query(connection, `SELECT PK_EMPRESA FROM TB_EMPRESA E INNER JOIN TA_USUARIO_EMP UE INNER JOIN TB_USUARIO U WHERE E.PK_EMPRESA = UE.FK_EMPRESA AND UE.FK_USUARIO = U.PK_USUARIO AND U.COD_USUARIO = ${codigoUsuarioAtual}`);

    if (resultCodigoEmpresa.length === 0) {
      statusCode = 400;
      error = "Dados da sua empresa não cadastrado no sistema."
    }

    const codigoEmpresa = resultCodigoEmpresa[0].PK_EMPRESA;

    // Runs the insert statement
    const insert = `INSERT INTO TB_USUARIO (FK_TPO_USUARIO, COD_USUARIO, TEL_USUARIO, EMAIL_USUARIO, SNA_USUARIO) VALUES (2, '${codigoUsuario}', '${telefone}', '${email}', '${senha}')`;
    // console.log(insert);
    result = await Connection.Query(connection, insert);

    // Checks if the insert was successful
    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao criar o usuário. Favor tente novamente mais tarde.";
    }

    const insertTaUsuarioEmp = `INSERT INTO TA_USUARIO_EMP (FK_USUARIO, FK_EMPRESA, FK_FUNCOES) VALUES ((SELECT PK_USUARIO FROM TB_USUARIO WHERE COD_USUARIO = ${codigoUsuario}), ${codigoEmpresa}, ${codigoTipoUsuario})`;

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
  // Finally statements runs after both try and catch blocks regardless
  finally {
    // Closes the DB connection
    // Connection.Connection.Disconnect(connection);

    // Writes the response head
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    // if there is a result that means the insert was successful, write back to the user
    if (error === null) {
      return res.end(JSON.stringify("Usuário criado com sucesso. Utilize senha 123"));
    }
    // reports errors if any happens
    else {
      return res.end(error)
    }
  }
}

async function BuscarFuncoesUsuario(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_FUNCOES, DESC_FUNCOES FROM TD_FUNCOES WHERE COD_FUNCOES <> 1";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhuma função de usuário cadastrado.");
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

async function BuscarTodasFuncoesUsuario(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_FUNCOES, DESC_FUNCOES FROM TD_FUNCOES";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhuma função de usuário cadastrado.");
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

async function BuscarTiposUsuario(_, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    connection = await Connection.Connect();

    const select = "SELECT COD_TPO_USUARIO, DESC_TPO_USUARIO FROM TD_TPO_USUARIO WHERE COD_TPO_USUARIO <> 3";

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhuma função de usuário cadastrado.");
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

async function BuscarUsuariosPorEmpresa(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    const codigoUsuarioAtual = req.user.CodigoUsuario;

    connection = await Connection.Connect();

    const select = `SELECT EMAIL_USUARIO, TEL_USUARIO, FK_FUNCOES, FK_TPO_USUARIO, COD_USUARIO FROM TB_USUARIO U INNER JOIN TA_USUARIO_EMP UE WHERE UE.FK_USUARIO = U.PK_USUARIO AND UE.FK_EMPRESA = (SELECT FK_EMPRESA FROM TA_USUARIO_EMP UE2 INNER JOIN TB_USUARIO U2 WHERE UE2.FK_USUARIO = U2.PK_USUARIO AND U2.COD_USUARIO = ${codigoUsuarioAtual}) ORDER BY FK_FUNCOES, COD_USUARIO`;

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhum usuário cadastrado na sua empresa.");
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

async function Atualizar(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    // Connects to the DB
    connection = await Connection.Connect();
    // Get the user data from the HTTP query
    const condigoFuncao = req.body.condigoFuncao;
    const codigoTipoUsuario = req.body.codigoTipoUsuario;
    const codigoUsuario = req.body.codigoUsuario;

    // Runs the update statement
    const updateTipoUsuario = `UPDATE TB_USUARIO SET FK_TPO_USUARIO = ${codigoTipoUsuario} WHERE COD_USUARIO = ${codigoUsuario}`;
    // console.log(insert);
    result = await Connection.Query(connection, updateTipoUsuario);

    // Checks if the update was successful
    if (result === null) {
      statusCode = 400;
      error = "Houve um erro ao atualizar o tipo do usuário. Favor tente novamente mais tarde.";
    }

    const updateFuncaoUsuario = `UPDATE TA_USUARIO_EMP SET FK_FUNCOES = ${condigoFuncao} WHERE FK_USUARIO = (SELECT PK_USUARIO FROM TB_USUARIO WHERE COD_USUARIO = ${codigoUsuario})`;

    result = await Connection.Query(connection, updateFuncaoUsuario);

    if (updateFuncaoUsuario === null) {
      statusCode = 400;
      error = "Houve um erro ao atualizar a função do usuário. Favor tente novamente mais tarde.";
    }
  }
  catch (e) {
    error = e.toString();
    statusCode = 500;
  }
  // Finally statements runs after both try and catch blocks regardless
  finally {
    // Closes the DB connection
    // Connection.Connection.Disconnect(connection);

    // Writes the response head
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    // if there is a result that means the insert was successful, write back to the user
    if (error === null) {
      return res.end(JSON.stringify("Usuário atualizado com sucesso."));
    }
    // reports errors if any happens
    else {
      return res.end(error)
    }
  }
}

module.exports = {
  Login,
  Atualizar,
  GerarAcesso,
  GerarAcessoAdmin,
  BuscarFuncoesUsuario,
  BuscarTodasFuncoesUsuario,
  BuscarTiposUsuario,
  BuscarUsuariosPorEmpresa
};
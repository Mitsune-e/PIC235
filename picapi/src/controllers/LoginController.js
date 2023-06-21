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
      console.log(process.env.TOKEN_KEY);
      token = jwt.sign(
        JSON.stringify({
          CodigoUsuario: userEncontrado.COD_USUARIO,
          TipoUsuario: userEncontrado.COD_TPO_USUARIO,
        }),
        process.env.TOKEN_KEY
      );
      console.log(token)
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
    if (result.rowsAffected[0] === 0) {
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
    if (result !== null) {
      return res.end(JSON.stringify("Usuário criado com sucesso. Utilize senha 123"));
    }
    // reports errors if any happens
    else {
      return res.end(error)
    }
  }
}

module.exports = {
  Login,
  GerarAcessoAdmin
};
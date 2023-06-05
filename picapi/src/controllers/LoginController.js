
const bcrypt = require("bcrypt");
const Connection = require("../helpers/connection");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

async function Login() {
  const connection = Connection.Connect()

}

async function GerarAcessoAdmin(req, res) {
  let error = null;
  let result = null;
  let statusCode = 200;
  let connection;

  try {
    // Connects to the DB
    connection = await Connection.Connection.Connect();
    // Get the user data from the HTTP query
    const senhaAdmin = req.query.senhaAdmin;

    if (senhaAdmin !== "PICADMIN") {
      throw "Acesso Inválido.";
    }

    const telefone = req.query.telefone;

    // Generates a password has fdor string "123", check how to generate the password for real later
    const senha = await bcrypt.hash("123", SALT_ROUNDS);

    const resultCodigo = await Connection.Connection.Query(connection, "SELECT MAX(PK_USUARIO) AS 'CODIGO' FROM TB_USUARIO");
    let codigoUsuario = 0;

    if (resultCodigo.rowsAffected > 0)
      codigoUsuario = resultCodigo.recordset[0].CODIGO;

    codigoUsuario = codigoUsuario + 1;

    // Runs the insert statement
    const insert = `INSERT INTO TB_USUARIO (FK_TPO_USUARIO, COD_USUARIO, TEL_USUARIO, SNA_USUARIO) VALUES (3, '${codigoUsuario}', '${telefone}', '${senha}')`;
    console.log(insert);
    result = await Connection.Connection.Query(connection, insert);

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
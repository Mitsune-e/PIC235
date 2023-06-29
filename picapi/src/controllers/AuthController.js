const jwt = require("jsonwebtoken");
const Connection = (require("../helpers/connection")).Connection;
const { DMN_TPO_USUARIO, DMN_FUNCOES } = require("../domains");

async function ValidarJWT(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).send("Token inválido.");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(`Sua sessão expirou. Favor realizar o login novamente. Erro: ${err}`);
  }
  return next();
};

async function ValidarAcessoAdmin(req, res, next) {
  try {
    const user = req.user;
    if (user.TipoUsuario !== DMN_TPO_USUARIO.ADMIN)
      return res.status(403).send("Acesso restrito.");
  } catch (err) {
    return res.status(400).send(`Houve um erro ao carregar os dados do seu login. Erro: ${err}`)
  }
  return next();
}

async function ValidarAcessoLiderMaximo(req, res, next) {
  let error = null;
  let result = null;
  let connection;

  try {
    connection = await Connection.Connect();

    const user = req.user;

    if (user.TipoUsuario === DMN_TPO_USUARIO.ADMIN)
      return res.status(403).send("Acesso restrito.");

    const select = `SELECT F.COD_FUNCOES FROM TB_USUARIO U INNER JOIN TA_USUARIO_EMP UE INNER JOIN TD_FUNCOES F WHERE U.PK_USUARIO = UE.FK_USUARIO AND UE.FK_FUNCOES = F.PK_FUNCOES AND U.COD_USUARIO = ${user.CodigoUsuario}`;

    result = await Connection.Query(connection, select);

    if (result.length === 0) {
      statusCode = 400;
      error = ("Nenhuma função de usuário cadastrado.");
      return;
    }

    const codigoFuncao = select[0].COD_FUNCOES;

    if (codigoFuncao !== DMN_FUNCOES.LIDER_MAXIO)
      return res.status(403).send("Acesso restrito");
  }
  catch (err) {
    return res.status(400).send(`Houve um erro ao carregar os dados do seu login. Erro: ${err}`)
  }
  return next();
}

module.exports = {
  ValidarJWT,
  ValidarAcessoAdmin,
  ValidarAcessoLiderMaximo
}
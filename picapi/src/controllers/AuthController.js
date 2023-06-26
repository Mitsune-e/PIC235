const jwt = require("jsonwebtoken");

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

module.exports = {
  ValidarJWT
}
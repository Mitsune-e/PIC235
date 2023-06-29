const express = require('express'); //app server
const bodyParser = require('body-parser'); // parser for post requests
const cors = require("cors");
const packagejson = require("./../package.json");

const controllers = require("./controllers");

const app = express();

app.use(cors());

app.use(function (_, res, next) {

  // Website you wish to allow to connect
  // res.setHeader('Acess-Control-Allow-Origin', '*')

  //Request methods you wish to allow
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');

  //Request headers you wish to allow
  res.setHeader('Acess-Control-Allow-Headers', 'X-Requestes-With, content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "true");

  //Pass to next layer of middleware
  next();
});

app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`I am Alive, PIC Api Version ${packagejson.version}`);
})

// Creates a post under the specified route using the specified method
//app.get("/Usuario/GerarAcessoAdmin", controllers.Login.GerarAcessoAdmin);
app.post("/Usuario/Atualizar", [controllers.Auth.ValidarJWT, controllers.Auth.ValidarAcessoLiderMaximo], controllers.Login.Atualizar);
app.post("/Usuario/CriarAcesso", [controllers.Auth.ValidarJWT, controllers.Auth.ValidarAcessoLiderMaximo], controllers.Login.GerarAcesso);
app.get("/Usuario/BuscarFuncoesUsuario", controllers.Auth.ValidarJWT, controllers.Login.BuscarFuncoesUsuario);
app.get("/Usuario/BuscarTodasFuncoesUsuario", controllers.Auth.ValidarJWT, controllers.Login.BuscarTodasFuncoesUsuario);
app.get("/Usuario/BuscarTiposUsuario", controllers.Auth.ValidarJWT, controllers.Login.BuscarTiposUsuario);
app.post("/Usuario/Login", controllers.Login.Login);
app.get("/Usuario/BuscarUsuariosPorEmpresa", controllers.Auth.ValidarJWT, controllers.Login.BuscarUsuariosPorEmpresa);

app.get("/Empresa/BuscarTiposCliente", controllers.Auth.ValidarJWT, controllers.Empresa.BuscarTipoCliente);
app.get("/Empresa/BuscarTiposServico", controllers.Auth.ValidarJWT, controllers.Empresa.BuscarTipoServico);
app.get("/Empresa/Buscar", controllers.Auth.ValidarJWT, controllers.Empresa.BuscarDados);
app.post("/Empresa/Cadastrar", [controllers.Auth.ValidarJWT, controllers.Auth.ValidarAcessoAdmin], controllers.Empresa.Cadastrar);

app.get("/Projeto/BuscarPorEmpresa", controllers.Auth.ValidarJWT, controllers.Projeto.BuscarPorEmpresa);
app.post("/Projeto/Cadastrar", [controllers.Auth.ValidarJWT, controllers.Auth.ValidarAcessoLiderMaximo], controllers.Projeto.Cadastrar);
app.post("/Projeto/Deletar", [controllers.Auth.ValidarJWT, controllers.Auth.ValidarAcessoLiderMaximo], controllers.Projeto.Deletar);

module.exports = {
  app
}
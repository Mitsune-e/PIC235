import * as ReactService from "./ReactService";

class Usuario extends ReactService.BaseService {
  constructor() {
    super("Usuario");
  }

  Login = (user) =>
    this.CreateRequest(ReactService.RequestType.POST, `Login`, user);

  BuscarFuncoesUsuario = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarFuncoesUsuario`);

  BuscarTodasFuncoesUsuario = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTodasFuncoesUsuario`);

  BuscarTiposUsuario = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTiposUsuario`);

  BuscarUsuariosPorEmpresa = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarUsuariosPorEmpresa`);

  CriarAcesso = (dados) =>
    this.CreateRequest(ReactService.RequestType.POST, `CriarAcesso`, dados);

  Atualizar = (dados) =>
    this.CreateRequest(ReactService.RequestType.POST, `Atualizar`, dados);

  CriarAcessoAdmin = () =>
    this.CreateRequest(ReactService.RequestType.GET, `GerarAcessoAdmin?senhaAdmin=PICADMIN&telefone=61912341235&email=some@mails.com`);

}

export const UsuarioService = new Usuario();

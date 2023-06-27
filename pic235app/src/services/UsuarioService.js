import * as ReactService from "./ReactService";

class Usuario extends ReactService.BaseService {
  constructor() {
    super("Usuario");
  }

  Login = (user) =>
    this.CreateRequest(ReactService.RequestType.POST, `Login`, user);

  BuscarTiposUsuario = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTiposUsuario`);

  CriarAcesso = (dados) =>
    this.CreateRequest(ReactService.RequestType.POST, `CriarAcesso`, dados);

  CriarAcessoAdmin = () =>
    this.CreateRequest(ReactService.RequestType.GET, `GerarAcessoAdmin?senhaAdmin=PICADMIN&telefone=61912341235&email=some@mails.com`);

}

export const UsuarioService = new Usuario();

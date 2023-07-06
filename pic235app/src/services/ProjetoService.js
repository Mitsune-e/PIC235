import * as ReactService from "./ReactService";

class Projeto extends ReactService.BaseService {
  constructor() {
    super("Projeto");
  }

  BuscarPorEmpresa = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarPorEmpresa`);

  Cadastrar = (dados) =>
    this.CreateRequest(ReactService.RequestType.POST, `Cadastrar`, dados)

  Deletar = (dados) =>
    this.CreateRequest(ReactService.RequestType.POST, `Deletar`, dados)
}

export const ProjetoService = new Projeto();

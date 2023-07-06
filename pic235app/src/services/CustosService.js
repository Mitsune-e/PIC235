import * as ReactService from "./ReactService";

class Custos extends ReactService.BaseService {
  constructor() {
    super("Custos");
  }

  BuscarTipoClassificao = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTipoClassificao`);

  BuscarTipoCusto = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTipoCusto`);

  BuscarPorEmpresa = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarPorEmpresa`);

  Cadastrar = (dadoscusto) =>
    this.CreateRequest(ReactService.RequestType.POST, `Cadastrar`, dadoscusto);

  Deletar = (dados) =>
    this.CreateRequest(ReactService.RequestType.POST, `Deletar`, dados)
}

export const CustosService = new Custos();

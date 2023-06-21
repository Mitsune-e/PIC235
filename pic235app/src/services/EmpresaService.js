import * as ReactService from "./ReactService";

class Empresa extends ReactService.BaseService {
  constructor() {
    super("Empresa");
  }

  BuscarTiposCliente = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTiposCliente`);

  BuscarTiposServico = () =>
    this.CreateRequest(ReactService.RequestType.GET, `BuscarTiposServico`);

  Cadastrar = (dadosEmpresa) =>
    this.CreateRequest(ReactService.RequestType.POST, `Cadastrar`, dadosEmpresa);
}

export const EmpresaService = new Empresa();

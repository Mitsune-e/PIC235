import React, { useState } from "react";
import { Navbar, SideBar } from "../../components";
import "./index.css"

export const Dashboard = () => {
    return (
        <div>
            <SideBar />
            <div className="mainbox">
                <div className="form-custos-cadastrados border border-secondary-subtle">
                    <form>
                        <div className="col">
                            <div className="mb-1 titulo-dashboard">
                                <h3 className="text-navy">Dashboard</h3>
                            </div>
                            <div>
                                <div className="mb-3 form-table">
                                    <label htmlFor="CustoFixosCadastrado" className="form-label text-navy">Custos Fixos Cadastrados</label>
                                    <table>
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Classificação</th>
                                            <th>Valor</th>
                                            <th>Vigência a partir de </th>
                                            <th>Vigência até</th>
                                        </tr>
                                        <tr>
                                            <td>Comissão de vendas</td>
                                            <td>Mês</td>
                                            <td>R$ 500</td>
                                            <td>28/08/2024</td>
                                            <td>28/09/2024</td>
                                        </tr>
                                        <tr>
                                            <td>teste xxx</td>
                                            <td>anual</td>
                                            <td>R$ 00000</td>
                                            <td>xx/xx/xxxx</td>
                                            <td>xx/xx/xxxx</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="mb-3 form-table">
                                    <label htmlFor="InvestimentosCadastrados" className="form-label text-navy">Investimentos Cadastrados</label>
                                    <table>
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Unidade</th>
                                            <th>Valor</th>
                                        </tr>
                                        <tr>
                                            <td>Aluguel</td>
                                            <td>xx</td>
                                            <td>R$ 500</td>
                                        </tr>
                                        <tr>
                                            <td>teste xxx</td>
                                            <td>xxxxx</td>
                                            <td>R$ 00000</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"

export const Credenciamento = (props) => {


    return (
        <div>
            <Navbar />
            <div className="mainbox">
                <div className="mb-1 titulo-cadastro">
                    <h3 className="text-navy">Tipos de Credenciamento</h3>
                </div>

                <div className="credenciamentos">

                    <div className="tudo">
                        <div className="container">
                            <h3>Autoridade Certificadora - AC</h3>
                            <h4>Responsável por emitir, expedir, distribuir, renovar, revogar e gerenciar certificados digitais</h4>
                            <div className="buttons">
                                <button>Saiba mais</button>
                                <button>Solicitar</button>
                            </div>
                        </div>

                        <div className="container">
                            <h3>Autoridade de Carimbo do Tempo - ACT</h3>
                            <h4>Responsável por emitir Carimbos do Tempo</h4>
                            <div className="buttons">
                                <button>Saiba mais</button>
                                <button>Solicitar</button>
                            </div>
                        </div>
                    </div>

                    <div className="tudo2">
                        <div className="container">
                            <h3>Autoridade de Registro - AR</h3>
                            <h4>Responsável pela interface entre o usuário e a Autoridade Certificadora - AC. É sempre vinculada a uma AC</h4>
                            <div className="buttons">
                                <button>Saiba mais</button>
                                <button>Solicitar</button>
                            </div>
                        </div>

                        <div className="container">
                            <h3>Prestadores de Serviço Biométrico - PSBios</h3>
                            <h4>Entidade com capacidade técnica para realizar a identificação e a verificação biométrica do requerente de um certificado digital</h4>
                            <div className="buttons">
                                <button>Saiba mais</button>
                                <button>Solicitar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

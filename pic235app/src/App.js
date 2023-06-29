import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Cadastro, Login, CadastroEmpresa, Dashboard, Notificacoes, Funcoes, Credenciamento, SelecioneEmpresa, CustosVariados, CustosFixos, Empresa, Projeto, NovoProjeto, InicialPerfil } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/selecioneEmpresa" element={<SelecioneEmpresa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/credenciamento" element={<Credenciamento />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/inicialPerfil" element={<InicialPerfil />} />
        <Route path="/funcoes" element={<Funcoes />} />
        <Route path="/empresa" element={<Empresa />} />
        {/*<Route path="/novoprojeto" element={<NovoProjeto />} />*/}
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/CustosFixos" element={<CustosFixos />} />
        <Route path="/CustosVariados" element={<CustosVariados />} />
      </Routes>
    </div>
  )
}

export default App

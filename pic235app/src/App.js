import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Cadastro, Login, CadastroEmpresa, Dashboard, Funcoes, Custos, Empresa, Projeto, InicialPerfil } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inicialPerfil" element={<InicialPerfil />} />
        <Route path="/funcoes" element={<Funcoes />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/Custos" element={<Custos />} />
      </Routes>
    </div>
  )
}

export default App

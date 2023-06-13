import React from "react";
import { Routes, Route } from "react-router-dom";
import { CustosFixos } from "./pages/CustosFixos";
import { CustosVariados } from "./pages/CustosVariados";
import { NovoProjeto } from "./pages/NovoProjeto";
import { Dashboard } from "./pages/Dashboard";
import { Home, Cadastro, Login, CadastroEmpresa, Projeto, NovoProjeto } from "./pages";
import { Home, Cadastro, Login, CadastroEmpresa,  Notificacoes, Perfil, Credenciamento} from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/novoprojeto" element={<NovoProjeto />} />
        <Route path="/CustosFixos" element={<CustosFixos />} />
        <Route path="/CustosVariados" element={<CustosVariados/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/credenciamento" element={<Credenciamento />} />
      </Routes>
    </div>
  )
}

export default App

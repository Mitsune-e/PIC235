import { Routes, Route } from "react-router-dom";
import { Home, Cadastro, Login, CadastroEmpresa, Projeto } from "./pages";
import { CustosFixos } from "./pages/CustosFixos";
import { CustosVariados } from "./pages/CustosVariados";
import { NovoProjeto } from "./pages/NovoProjeto";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/novoprojeto" element={<NovoProjeto />} />
        <Route path="/CustosFixos" element={<CustosFixos />} />
        <Route path="/CustosVariados" element={<CustosVariados/>}/>
      </Routes>
    </div>
  )
}

export default App
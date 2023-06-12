import { Routes, Route } from "react-router-dom";
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
        <Route path="/credenciamento" element={<Credenciamento />} />
      </Routes>
    </div>
  )
}

export default App

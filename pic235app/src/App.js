import { Routes, Route } from "react-router-dom";
import { Home, Cadastro, Login, CadastroEmpresa } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
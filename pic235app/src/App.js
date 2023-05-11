import { Routes, Route } from "react-router-dom";
import { Home, Cadastro } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  )
}

export default App
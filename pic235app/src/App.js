import { Routes, Route } from "react-router-dom";
import { Cadastro } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cadastro />} />
      </Routes>
    </div>
  )
}

export default App
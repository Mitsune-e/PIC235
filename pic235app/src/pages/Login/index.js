import React, { useState } from "react";
import { Navbar } from "../../components";
import "./index.css"
import { UsuarioService } from "../../services";
import { Session } from "../../session";
import { useNavigate } from 'react-router-dom';
import UseInput from "../../hooks/UseInput";

export const Login = (props) => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Senha, InputSenha] = UseInput("Senha", "senha", "password")
  const [Erro, setErro] = useState("");

  async function doLogin(e) {
    e.preventDefault();
    try {
      const user = {
        email: Email,
        senha: Senha
      };

      console.log({ Email })
      console.log({ Senha })
      console.log({ user })

      const token = await UsuarioService.Login(user);

      await Session.setToken(token);

      navigate("/");
    }
    catch (e) {
      console.log(e)
      setErro(e);
    }
  }

  return (
    <div>
      <Navbar />
      {/*To do: rename for login stuff */}
      <div className="mainbox">
        <div className="form-login border border-secondary-subtle">
          <form>
            <div className="col">
              <div className="mb-1 titulo-login">
                <h3 className="text-navy">Login de Usuario</h3>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label text-navy">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
              </div>
              {InputSenha}
              <button type="submit" className="btn btn-outline-teal" onClick={(e) => doLogin(e)}>Login</button>

              {Erro !== "" && <>
                <div className="alert alert-danger">{Erro}</div>
              </>}
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

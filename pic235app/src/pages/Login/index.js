import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./index.css"
import { UsuarioService } from "../../services";
import { Session } from "../../session";
import { useNavigate } from 'react-router-dom';
import { UseInput } from "../../hooks";

export const Login = (props) => {
  const navigate = useNavigate();

  const [Email, InputEmail] = UseInput("Email", "email", "email");
  const [Senha, InputSenha] = UseInput("Senha", "senha", "password");
  const [Erro, setErro] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await Session.clear();
      }
      catch (e) {
        setErro(e);
      }
    })();
  }, [navigate]);

  async function doLogin(e) {
    e.preventDefault();
    try {
      const user = {
        email: Email,
        senha: Senha
      };

      const token = await UsuarioService.Login(user);

      await Session.setToken(token);

      navigate("/dashboard");
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
              {InputEmail}
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

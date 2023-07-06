import React, { useEffect } from "react";
import "./index.css"
import { useNavigate } from 'react-router-dom';
import { Session } from "../../session";

export const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = await Session.getToken();

      if (!token || token === null || token === undefined) {
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div className="navbar-box">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border">
        <div className="container-fluid">
          <img className="logo img-fluid d-inline-block align-text-top navbar-brand" src="/DFBEagle.png" alt="Capital Digital" />
          <div className="register-option" >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="login-option">
                  <a className="btn btn-outline-teal" href="/Login">Login</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
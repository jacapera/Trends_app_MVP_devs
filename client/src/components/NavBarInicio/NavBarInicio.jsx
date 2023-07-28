import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/imagenes/1 (3) (2).png';
import "./NavBarInicio.css";

function NavBarInicio() {
  // Función para cambiar el modo entre claro y oscuro
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }

  return (
    <nav className="navigation">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="Logo" />
        {/*<span>Logo</span>*/}
      </div>

      {/* Login */}
      <div className="login">
        <Link to="/Trends_app_MVP/login">Login</Link>
      </div>
      {/* Login */}
      <div className="SIGN UP">
        <Link to="/Trends_app_MVP/register">Sign up</Link>
      </div>
      
      {/* Modo Oscuro */}
      <div className="dark-mode">
        <button onClick={toggleDarkMode}>
          <i className="fas fa-moon"></i> {/* Icono de luna (modo oscuro) */}
        </button>
      </div>
    </nav>
  );
}

export default NavBarInicio;

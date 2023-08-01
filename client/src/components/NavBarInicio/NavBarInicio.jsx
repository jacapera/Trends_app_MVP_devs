import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/imagenes/1 (3) (2).png';
import "./NavBarInicio.css";

function NavBarInicio() {
  // Estado para controlar la visibilidad del menú desplegable
  const [showMenu, setShowMenu] = useState(false);

  // Función para cambiar el modo entre claro y oscuro
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }

  // Función para alternar la visibilidad del menú desplegable
  function toggleMenu() {
    setShowMenu(!showMenu);
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

      {/* Sign Up (Registro) */}
      <div className="SIGN_UP">
        <button onClick={toggleMenu}>Sign up</button>
        <div className={`register-options ${showMenu ? "show" : ""}`}>
          <Link to="/Trends_app_MVP/studentRegister">Student</Link>
          <Link to="/Trends_app_MVP/professionalRegister">Professional</Link>
          <Link to="/Trends_app_MVP/companyRegister">Company</Link>
        </div>
      </div>

      {/* Modo Oscuro */}
      <div className="dark-mode-button">
        <button onClick={toggleDarkMode}>
          <i className="fas fa-moon"></i> 
        </button>
      </div>
    </nav>
  );
}

export default NavBarInicio;

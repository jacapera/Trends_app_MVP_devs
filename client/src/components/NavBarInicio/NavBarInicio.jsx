<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/imagenes/1 (3) (2).png";
import "./NavBarInicio.css";
function NavBarInicio() {
  const [showMenu, setShowMenu] = useState(false);
  const menuTimerRef = useRef(null);

  // Función para cambiar el modo entre claro y oscuro
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }

  // Función para mostrar/ocultar el menú desplegable al hacer clic en "Sign up"
  function toggleMenu() {
    setShowMenu((prevState) => !prevState);
  }

  // Función para desactivar el menú desplegable después de 2 segundos si no se selecciona ninguna opción
  useEffect(() => {
    if (showMenu) {
      menuTimerRef.current = setTimeout(() => {
        setShowMenu(false);
      }, 2000);
    } else {
      clearTimeout(menuTimerRef.current);
    }

    return () => clearTimeout(menuTimerRef.current);
  }, [showMenu]);

  // Función para manejar la selección de una opción del menú
  function handleMenuOptionClick() {
    setShowMenu(false);
    clearTimeout(menuTimerRef.current);
  }

  return (
    <nav className="navigation">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="Logo" />
        {/*<span>Logo</span>*/}
      </div>

      {/* Login y Sign Up (Registro) */}
      <div
        className={`auth-buttons ${showMenu ? "show-menu" : ""}`}
        onClick={toggleMenu}
      >
        <Link to="/Trends_app_MVP/login">Login</Link>
        <button>Sign up</button>
        <div className="register-options">
          <Link to="/Trends_app_MVP/studentRegister" onClick={handleMenuOptionClick}>
            Student
          </Link>
          <Link to="/Trends_app_MVP/professionalRegister" onClick={handleMenuOptionClick}>
            Professional
          </Link>
          <Link to="/Trends_app_MVP/companyRegister" onClick={handleMenuOptionClick}>
            Company
          </Link>
        </div>
      </div>


      {/* Botón de Modo Oscuro */}
      <div className="dark-mode-button">
        <button onClick={toggleDarkMode}>
          <i className="fas fa-moon"></i>
        </button>
      </div>
    </nav>
  );
}

export default NavBarInicio;
=======
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
>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558

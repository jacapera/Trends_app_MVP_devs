import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/imagenes/1 (3) (2).png';
import "./NavBarInicio.css";

function NavBarInicio() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuSelected, setMenuSelected] = useState(false);

  // Función para cambiar el modo entre claro y oscuro
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }

  // Función para mostrar/ocultar el menú desplegable al hacer clic en "Sign up"
  function toggleMenu() {
    setShowMenu((prevState) => !prevState);
  }

  // Función para ocultar el menú desplegable si no se selecciona ninguna opción en 2 segundos
  useEffect(() => {
    let timer;
    if (showMenu && !menuSelected) {
      timer = setTimeout(() => {
        setShowMenu(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showMenu, menuSelected]);

  // Función para manejar la selección de una opción del menú
  function handleMenuOptionClick() {
    setMenuSelected(true);
    setShowMenu(false);
  }

  return (
    <nav className="navigation">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Login */}
      <div className="login">
        <Link to="/Trends_app_MVP/login">Login</Link>
      </div>

      {/* Sign Up (Registro) */}
      <div className={`SIGN_UP ${showMenu ? "show" : ""}`} onClick={toggleMenu}>
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

      {/* Modo Oscuro */}
      <div className="dark-mode">
        <button onClick={toggleDarkMode}>
          <i className="fas fa-moon"></i>
        </button>
      </div>
    </nav>
  );
}

export default NavBarInicio;

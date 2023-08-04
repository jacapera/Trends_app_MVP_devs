import { useState, useEffect, useRef } from "react";
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
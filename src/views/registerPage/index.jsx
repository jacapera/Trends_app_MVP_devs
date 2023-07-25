import { useState } from "react";
import ProfessionalRegisterForm from "../../components/profesionalRegisterForm";
import { useNavigate } from "react-router-dom";
import './register.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState("");

  const handleRegister = (type) => {
    setRegisterForm(type);
  };

  return (
    <main className="main-container">
      <h2>First of all... How do you want to register?</h2>
      {registerForm === "" && (
        <section className="button-section">
          <button className="register-button" onClick={() => handleRegister("student")}>
            Student
          </button>
          <button className="register-button" onClick={() => handleRegister("professional")}>
            Professional
          </button>
          <button className="register-button" onClick={() => handleRegister("company")}>
            Company
          </button>
        </section>
      )}
      {registerForm === "student" && (
        <div>here would go the register for students... IF I had one!</div>
      )}
      {registerForm === "professional" && <ProfessionalRegisterForm />}
      {registerForm === "company" && (
        <div>
          {
            "here would go the registry for companies... and as you should suppose... I DON'T HAVE IT"
          }
        </div>
      )}
      <footer className="footer-container">
        <button className="back-button" onClick={() => navigate("/Trends_app_MVP/")}>
          Go to back
        </button>
      </footer>
    </main>
  );
}

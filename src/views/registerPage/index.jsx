import { Button } from "@tremor/react";
import { useState } from "react";
import ProfessionalRegisterForm from "../../components/profesionalRegisterForm";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate()
  const [registerForm, setRegisterForm] = useState("");

  const handleRegister = (type) => {
    setRegisterForm(type);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      <h2>First of all... How do you want to register?</h2>
      {registerForm === "" && (
        <section className="flex flex-col items-stretch gap-10 w-28">
          <Button className="w-full" onClick={() => handleRegister("student")}>
            Student
          </Button>
          <Button onClick={() => handleRegister("professional")}>
            Professional
          </Button>
          <Button onClick={() => handleRegister("company")}>Company</Button>
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
      <footer className="self-start">
        <Button onClick={() => navigate("/Trends_app_MVP/")} variant="secondary">
          Go to back
        </Button>
      </footer>
    </main>
  );
}

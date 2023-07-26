import { Button } from "@tremor/react";
import { useState } from "react";
import {
  ProfessionalRegisterForm,
  StudentRegisterForm,
  CompanyRegisterForm,
} from "../../components";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
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
      {registerForm === "student" && <StudentRegisterForm />}
      {registerForm === "professional" && <ProfessionalRegisterForm />}
      {registerForm === "company" && <CompanyRegisterForm />}
      <footer className="self-start">
        <Button
          onClick={() => navigate("/Trends_app_MVP/")}
          variant="secondary"
        >
          Go to back
        </Button>
      </footer>
    </main>
  );
}

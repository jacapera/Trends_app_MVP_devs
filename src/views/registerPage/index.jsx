import { useState } from "react";
import PersonalRegister from "../../components/personalRegister";
import AcademicRegister from "../../components/academicRegister";
import InterestInfoRegister from "../../components/interestInfoRegister";
import { Button } from "@tremor/react";

export default function RegisterPage({ setData }) {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const forms = [
    {
      component: PersonalRegister,
      key: "profile",
    },
    {
      component: AcademicRegister,
      key: "academic",
    },
    {
      component: InterestInfoRegister,
      key: "info",
    },
  ];

  const [isFormsComplete, setIsFormsComplete] = useState({
    profile: false,
    academic: false,
    info: false,
  });

  const handleNextStep = () => {
    setCurrentFormIndex((prevIndex) => prevIndex + 1);
  };

  const registerSubmit = () => {};

  const CurrentForm = forms[currentFormIndex].component;
  const formKey = forms[currentFormIndex].key;

  return (
    <main>
      <CurrentForm
        setData={setData}
        formKey={formKey}
        setFormsComplete={setIsFormsComplete}
      />

      <div>
        {currentFormIndex < forms.length - 1 ? (
          <Button disabled={!isFormsComplete[formKey]} onClick={handleNextStep}>
            <span className="text-xl uppercase">Next Step</span>
          </Button>
        ) : (
          <Button
            disabled={!isFormsComplete[currentFormIndex]}
            onClick={registerSubmit}
          >
            <span>Register!</span>
          </Button>
        )}
      </div>
    </main>
  );
}
import { useState } from "react";
import PersonalRegister from "../../components/personalRegister";
import AcademicRegister from "../../components/academicRegister";
import InterestInfoRegister from "../../components/interestInfoRegister";
import { Button } from "@tremor/react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/outline/";

export default function RegisterPage({ setData }) {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [forms, setForms] = useState([
    {
      Form: PersonalRegister,
      dataName: "profile",
      completed: false,
    },
    {
      Form: AcademicRegister,
      dataName: "academic",
      completed: false,
    },
    {
      Form: InterestInfoRegister,
      dataName: "info",
      completed: false,
    },
  ]);
  const CurrentForm = forms[currentFormIndex];

  const checkCompletedForms = (isFormComplete) => {
    setForms((prevState) =>
      prevState.map((el, i) =>
        i === currentFormIndex ? { ...el, completed: isFormComplete } : el
      )
    );
    // console.log(`checkCompletedForms ${isFormComplete}`);
  };

  const handleNextStep = () => {
    setCurrentFormIndex((prevIndex) => prevIndex + 1);
    console.log(CurrentForm);
  };

  const registerSubmit = () => {};

  return (
    <div className="flex flex-col gap-4">
      <main>
        <CurrentForm.Form
          setData={setData}
          dataName={CurrentForm.dataName}
          checkCompletedForms={checkCompletedForms}
        />

        <div>
          {currentFormIndex < forms.length - 1 ? (
            <Button
              disabled={!CurrentForm.completed}
              onClick={handleNextStep}
            >
              <span className="text-xl uppercase">Next Step</span>
            </Button>
          ) : (
            <Button
              disabled={!CurrentForm.completed}
              onClick={registerSubmit}
            >
              <span>Register!</span>
            </Button>
          )}
        </div>
      </main>
      <footer className="flex self-center">
        <div className="w-8">
          {forms[0].completed ? (
            <CheckCircleIcon className="text-green-600" />
          ) : (
            <MinusCircleIcon className="text-red-600" />
          )}
        </div>
        <div className="w-8">
          {forms[1].completed ? (
            <CheckCircleIcon className="text-green-600" />
          ) : (
            <MinusCircleIcon className="text-red-600" />
          )}
        </div>
        <div className="w-8">
          {forms[2].completed ? (
            <CheckCircleIcon className="text-green-600" />
          ) : (
            <MinusCircleIcon className="text-red-600" />
          )}
        </div>
      </footer>
    </div>
  );
}

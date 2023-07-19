import { useState } from "react";
import PersonalRegister from "../../components/personalRegister";
import AcademicRegister from "../../components/academicRegister";
import InterestInfoRegister from "../../components/interestInfoRegister";
import { Button } from "@tremor/react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/outline/";

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
  const dataName = forms[currentFormIndex].key;

  return (
    <div className="flex flex-col gap-4">
      <main>
        <CurrentForm
          setData={setData}
          dataName={dataName}
          setFormsComplete={setIsFormsComplete}
        />

        <div>
          {currentFormIndex < forms.length - 1 ? (
            <Button
              disabled={!isFormsComplete[dataName]}
              onClick={handleNextStep}
            >
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
      <footer className="flex self-center">
        <div className="w-8">
          {isFormsComplete.profile ? (
            <CheckCircleIcon className="text-green-600" />
          ) : (
            <MinusCircleIcon className="text-red-600"/>
          )}
        </div>
        <div className="w-8">
          {isFormsComplete.academic ? (
            <CheckCircleIcon className="text-green-600" />
          ) : (
            <MinusCircleIcon className="text-red-600"/>
          )}
        </div>
        <div className="w-8">
          {isFormsComplete.info ? (
            <CheckCircleIcon className="text-green-600" />
          ) : (
            <MinusCircleIcon className="text-red-600"/>
          )}
        </div>
      </footer>
    </div>
  );
}

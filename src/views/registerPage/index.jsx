import { useState } from "react";
import PersonalRegister from "../../components/personalRegister";
import AcademicRegister from "../../components/academicRegister";
import InterestInfoRegister from "../../components/interestInfoRegister";
import { Button } from "@tremor/react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/outline/";

export default function RegisterPage() {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({
    profile: {},
    academic: {},
    info: {},
  });
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [forms, setForms] = useState([
    {
      Form: PersonalRegister,
      dataName: "profile",
      completed: false,
      initialInputs: {
        email: "",
        username: "",
        name: "",
        age: "",
        password: "",
        city: "",
        country: "",
        support: "yes",
      },
    },
    {
      Form: AcademicRegister,
      dataName: "academic",
      completed: false,
      initialInputs: {
        type: "",
        institution: "",
        level: "",
        area: [],
        graduation: "",
      },
    },
    {
      Form: InterestInfoRegister,
      dataName: "info",
      completed: false,
      initialInputs: {
        company: "",
        position: "",
        career: [],
        skills: [],
        interests: [],
        goals: [],
        languages: [],
        availability: "",
        contract: "",
      },
    },
  ]);
  const CurrentForm = forms[currentFormIndex];

  const checkCompletedForms = (isFormComplete, dataName) => {
    setForms((prevState) =>
      prevState.map((el) =>
        el.dataName === dataName ? { ...el, completed: isFormComplete } : el
      )
    );
  };

  const handleUserData = (inputs) => (setUserData({ ...inputs }));

  const handleNextStep = (isFormComplete, dataName, userData) => {
    if (isFormComplete) {
      setData((prevState) => ({
        ...prevState,
        [dataName]: userData,
      }));
      setCurrentFormIndex((prevIndex) =>
        prevIndex < 2 ? prevIndex + 1 : prevIndex
      );
    } else {
      console.error("Missing data in forms.");
    }
    console.log(isFormComplete, dataName, userData);
  };

  const registerSubmit = () => {
    handleNextStep(CurrentForm.completed, CurrentForm.dataName, userData);
    alert("register complete!")
  };

  return (
    <div className="flex flex-col gap-4">
      <main>
        <CurrentForm.Form
          handleUserData={handleUserData}
          dataName={CurrentForm.dataName}
          initialInputs={CurrentForm.initialInputs}
          checkCompletedForms={checkCompletedForms}
        />

        <div>
          {currentFormIndex < forms.length - 1 ? (
            <Button disabled={!CurrentForm.completed} onClick={() => handleNextStep(CurrentForm.completed, CurrentForm.dataName, userData)}>
              <span className="text-xl uppercase">Next Step</span>
            </Button>
          ) : (
            <Button disabled={!CurrentForm.completed} onClick={registerSubmit}>
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
      {data && (
        <>
          <section>
            <p>{JSON.stringify(data)}</p>
          </section>
          <button
            onClick={() =>
              setData({
                profile: {},
                academic: {},
                info: {},
              })
            }
          >
            delete data
          </button>
        </>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import PersonalRegister from "../../components/personalRegister";
import AcademicRegister from "../../components/academicRegister";
import InterestInfoRegister from "../../components/interestInfoRegister";
import { Button, ProgressBar } from "@tremor/react";
import { ArrowSmLeftIcon } from "@heroicons/react/outline/";
import { sendDataRegister } from "../../services/fetchingAPI";

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

  const handleUserData = (inputs) => setUserData({ ...inputs });

  const handlePrevForm = () => {
    setCurrentFormIndex((prevState) =>
      prevState > 0 ? prevState - 1 : prevState
    );
  };

  const handleSaveData = (isFormComplete, dataName, userData) => {
    if (isFormComplete) {
      setData((prevState) => ({
        ...prevState,
        [dataName]: userData,
      }));
      setCurrentFormIndex((prevState) =>
        prevState < forms.length - 1 ? prevState + 1 : prevState
      );
    } else {
      console.error("Missing data in forms.");
    }
    console.log(isFormComplete, dataName, userData);
  };

  useEffect(() => {
    if (
      Object.keys(data.academic).length &&
      Object.keys(data.academic).length &&
      Object.keys(data.info).length
    ) {
      sendDataRegister(data);
      alert("sending data...")
    }
  }, [data]);

  const handleProgressBar = () => {
    const completedForms = forms.filter((form) => form.completed).length;
    return (completedForms / forms.length) * 100;
  };

  const progressValue = handleProgressBar();

  return (
    <div className="flex flex-col gap-4">
      <main>
        <CurrentForm.Form
          data={data}
          handleUserData={handleUserData}
          dataName={CurrentForm.dataName}
          initialInputs={CurrentForm.initialInputs}
          checkCompletedForms={checkCompletedForms}
        />
        <div className="flex gap-4 justify-center">
          <Button
            className="cursor-pointer"
            variant="secondary"
            icon={ArrowSmLeftIcon}
            disabled={currentFormIndex === 0}
            onClick={handlePrevForm}
          >
            <span className="text-base">Back</span>
          </Button>
          <Button
            className="cursor-pointer"
            disabled={!CurrentForm.completed}
            onClick={() =>
              handleSaveData(
                CurrentForm.completed,
                CurrentForm.dataName,
                userData
              )
            }
          >
            <span className="text-base uppercase">
              {currentFormIndex < forms.length - 1 ? "Next Step" : "Register"}
            </span>
          </Button>
        </div>
      </main>
      <ProgressBar value={progressValue} showAnimation={true} />
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

import { useEffect, useState } from "react";
import AcademicRegister from "../components/registerFormProfesional/academicRegisterForm";
import InterestRegister from "../components/registerFormProfesional/interestRegisterForm";
import PersonalRegister from "../components/registerFormProfesional/personalRegisterForm";
import { sendDataRegister } from "../services/fetchingAPI";
import MainRegister from "../components/registerFormProfesional/mainRegisterForm";

export const useRegister = () => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({
    profile: {},
    academic: {},
    info: {},
  });
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [forms, setForms] = useState([
    {
      Form: MainRegister,
      dataName: "profile",
      completed: false,
      initialInputs: {
        username: "",
        password: "",
      },
    },
    {
      Form: PersonalRegister,
      dataName: "profile",
      completed: false,
      initialInputs: {
        email: "",
        username: "",
        name: "",
        birth: "",
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
      Form: InterestRegister,
      dataName: "info",
      completed: false,
      initialInputs: {
        company: "",
        position: "",
        career: [],
        skills: [],
        interests: [],
        goals: [],
        problematics: [],
        languages: [],
        availability: "",
        contract: "",
      },
    },
  ]);

  const resetAllData = () => {
    setData({
      profile: {},
      academic: {},
      info: {},
    });
  };

  const checkCompletedForms = (isFormComplete, dataName) => {
    setForms((prevState) =>
      prevState.map((el) =>
        el.dataName === dataName ? { ...el, completed: isFormComplete } : el
      )
    );
  };

  const handleUserData = (inputs) => setUserData({ ...inputs });

  const handlePrevForm = () => {
    forms[currentFormIndex].completed = false
    setUserData({});
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
  };

  useEffect(() => {
    if (
      Object.keys(data.academic).length &&
      Object.keys(data.academic).length &&
      Object.keys(data.info).length
    ) {
      sendDataRegister(data);
      alert("sending data...");
      resetAllData();
    }
  }, [data]);

  const handleProgressBar = () => {
    const completedForms = forms.filter((form) => form.completed).length;
    return (completedForms / forms.length) * 100;
  };

  return {
    data,
    userData,
    forms,
    currentFormIndex,
    checkCompletedForms,
    handlePrevForm,
    handleProgressBar,
    handleSaveData,
    handleUserData,
  };
};

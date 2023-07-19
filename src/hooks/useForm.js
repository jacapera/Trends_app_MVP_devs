import { useEffect, useRef, useState } from "react";
// import { objectToFormData } from "../utils/objectToFormData";
import {
  validateAcademicForm,
  validateProfileForm,
} from "../utils/validateForm";

export const useForm = (setData, dataName) => {
  const REGEX_CONSECUTIVE_SPACES = /\s{2,}/g;
  const initialStates = {
    profile: {
      inputs: {
        email: "",
        username: "",
        name: "",
        age: "",
        password: "",
        city: "",
        country: "",
        support: "yes", // dar apoyo
      },
      ref: {
        email: true,
        username: true,
        name: true,
        age: true,
        password: true,
        city: true,
        country: true,
      },
    },
    academic: {
      inputs: {
        type: "", // Sin exp - Junior - Intermedio - Senior
        institution: "",
        level: "", // Nivel educativo
        area: [], // Área de su(s) carrera(s) (con grado y/o posgrado)
        graduation: "",
      },
      ref: {
        type: true,
        institution: true,
        level: true,
        area: true,
        graduation: true,
      },
    },
    info: {
      inputs: {
        company_name: "",
        position: "",
        career: [], // responsabilidades, logros
        skills: [],
        interests: [],
        goals: [],
        languages: [],
        availability: "",
        contract: "", // Tipo de contratación
      },
      ref: {
        company_name: true,
        position: true,
        career: true, // responsabilidades, logros
        skills: true,
        interests: true,
        goals: true,
        languages: true,
        availability: true,
        contract: true, // Tipo de contratación
      },
    },
  };

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [inputs, setInputs] = useState({
    ...initialStates[dataName].inputs,
  });
  const [errors, setErrors] = useState({});
  const isFirstInputs = useRef({ ...initialStates[dataName].ref });

  //cada vez que cambia el valor de un input se ejecuta esta funcion
  const handleInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value.replace(REGEX_CONSECUTIVE_SPACES, " ");

    if (name === "email" || name === "age" || name === "graduation")
      if (event.key === " ") event.preventDefault();

    if (name === "area") {
      if (value.trim() && event.keyCode === 13) {
        setInputs((prevState) => {
          return {
            ...prevState,
            [name]: [...new Set([...prevState[name], value.trim()])],
          };
        });
        event.target.value = "";
      }
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (event, name) => {
    const value = event;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    if (isFormComplete) {
      // const formData = objectToFormData(inputs);
      setData((prevState) => ({
        ...prevState,
        [dataName]: { ...inputs },
      }));
      setInputs({ ...initialStates[dataName].inputs });
      isFirstInputs.current = { ...initialStates[dataName].ref };
    } else {
      alert("Error! Missing data.");
    }
  };

  const handleOptions = (name, opt) => {
    const filterOptions = inputs[name].filter((area) => area !== opt);
    setInputs((prevState) => ({
      ...prevState,
      [name]: filterOptions,
    }));
  };

  //cada vez que cambia el valor de un input
  //se ejecuta esta funcion para validar el valor del input
  useEffect(() => {
    if (dataName === "profile")
      setErrors(validateProfileForm(inputs, isFirstInputs));
    if (dataName === "academic")
      setErrors(validateAcademicForm(inputs, isFirstInputs));
    //if(dataName === "info") setErrors(validateProfileForm(inputs, isFirstInputs))
  }, [inputs, dataName]);

  //esta funcion esta a la espera de que no haya mas errores
  //para asi poder saber cuando el formulario se completó correctamente
  useEffect(() => {
    setIsFormComplete(
      Object.entries(inputs).every(([, value]) => value.length !== 0) &&
        Object.keys(errors).length === 0
    );
  }, [errors, inputs]);

  return {
    isFormComplete,
    inputs,
    errors,
    handleInputs,
    handleSelectChange,
    handleSumbit,
    handleOptions,
  };
};

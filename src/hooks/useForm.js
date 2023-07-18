import { useEffect, useRef, useState } from "react";
// import { objectToFormData } from "../utils/objectToFormData";
import { validateForm } from "../utils/validateForm";

export const useForm = (setData, dataName) => {
  const initialStates = {
    inputs: {
      email: "",
      username: "",
      name: "",
      age: "",
      password: "",
      city: "",
      country: "",
      support: "yes",
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
  };

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [inputs, setInputs] = useState({
    ...initialStates.inputs,
  });
  const [errors, setErrors] = useState({});
  const isFirstInputs = useRef({ ...initialStates.ref });

  //cada vez que cambia el valor de un input se ejecuta esta funcion
  const handleInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const country = event;
    setInputs((prevState) => ({
      ...prevState,
      country: country,
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
      setInputs({ ...initialStates.inputs });
      isFirstInputs.current = { ...initialStates.ref };
    } else {
      alert("Error! Missing data.");
    }
  };

  //cada vez que cambia el valor de un input
  //se ejecuta esta funcion para validar el valor del input
  useEffect(() => {
    // console.log(inputs);
    setErrors(validateForm(inputs, isFirstInputs));
  }, [inputs]);

  //esta funcion esta a la espera de que no haya mas errores
  //para asi poder saber cuando el formulario se completó correctamente
  useEffect(() => {
    setIsFormComplete(
      Object.entries(inputs).every(([, value]) => value !== "") &&
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
  };
};

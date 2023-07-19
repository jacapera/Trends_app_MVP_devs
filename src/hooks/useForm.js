import { useEffect, useState } from "react";
// import { objectToFormData } from "../utils/objectToFormData";

export const useForm = (
  inputs,
  errors,
  resetInputs,
  setData,
  dataName,
  checkCompletedForms
) => {
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormComplete) {
      // const formData = objectToFormData(inputs);
      setData((prevState) => ({
        ...prevState,
        [dataName]: { ...inputs },
      }));
      resetInputs();
    } else {
      alert("Error! Missing data.");
    }
  };

  //esta funcion esta a la espera de que no haya mas errores
  //para asi poder saber cuando el formulario se completó correctamente
  useEffect(() => {
    const checkInputs = Object.entries(inputs).every(([, value]) => value.length !== 0)
    const checkErrors = Object.keys(errors).length === 0
    setIsFormComplete(checkErrors && checkInputs);
    // console.log(`isFormComplete: ${isFormComplete}, dataName: ${dataName}`);
  }, [errors, inputs]);

  useEffect(() => {
    checkCompletedForms(isFormComplete);
  }, [isFormComplete]);

  return {
    handleSubmit,
  };
};

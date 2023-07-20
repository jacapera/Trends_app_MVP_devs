import { useEffect } from "react";

export const useForm = (
  inputs,
  errors,
  dataName,
  checkCompletedForms,
  handleUserData
) => {
  //esta funcion esta a la espera de que no haya mas errores
  //para asi poder saber cuando el formulario se completó correctamente
  useEffect(() => {
    console.log(inputs, errors);
    const checkInputs = Object.entries(inputs).every(([, value]) => value.length !== 0)
    const checkErrors = Object.keys(errors).length === 0
    if (checkErrors && checkInputs){
      handleUserData(inputs)
    }
    checkCompletedForms(checkErrors && checkInputs, dataName);
    //setIsFormComplete(checkErrors && checkInputs);
  }, [errors, inputs]);

  // useEffect(() => {
  //   checkCompletedForms(isFormComplete, dataName);
  // }, [isFormComplete]);
};

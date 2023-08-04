import { useEffect } from "react";

export const useForm = (
  inputs,
  errors,
  dataName,
  checkCompletedForms,
  handleUserData
) => {
  useEffect(() => {
    const checkInputs = Object.entries(inputs).every(
      ([, value]) => value.length !== 0
    );
    const checkErrors = Object.keys(errors).length === 0;
    if (checkErrors && checkInputs) {
      handleUserData(inputs);
    }
    checkCompletedForms(checkErrors && checkInputs, dataName);
  }, [errors, inputs]);
};

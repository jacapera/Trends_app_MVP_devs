import { useEffect, useRef, useState } from "react";
import {
  validateAcademicForm,
  validateInfoForm,
  validateProfileForm,
} from "../utils/validateForm";

export const useFields = (initialInputs, initialRefs, dataName, data) => {
  const REGEX_CONSECUTIVE_SPACES = /\s{2,}/g;

  const [inputs, setInputs] = useState(
    Object.keys(data[dataName]).length === 0
      ? { ...initialInputs }
      : { ...data[dataName] }
  );
  const [input, setInput] = useState({ nameInput: "", valueInput: "" });
  const [errors, setErrors] = useState({});
  const isFirstInputs = useRef({ ...initialRefs });

  //cada vez que cambia el valor de un input se ejecuta esta funcion
  const handleInputs = (event, type) => {
    const nameInput = event.target.name;
    let valueInput = event.target.value;
    if (nameInput !== "password")
      valueInput = valueInput.replace(REGEX_CONSECUTIVE_SPACES, " ");

    if (
      nameInput === "email" ||
      nameInput === "age" ||
      nameInput === "graduation"
    )
      if (event.key === " ") event.preventDefault();

    if (type === "options") {
      setInput({ nameInput, valueInput });
      if (errors[nameInput]) return;
      if (valueInput.trim() && event.keyCode === 13) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [nameInput]: [
            ...new Set([...prevInputs[nameInput], valueInput.trim()]),
          ],
        }));
        event.target.value = "";
        setInput({ nameInput: "", valueInput: "" });
      }
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [nameInput]: valueInput,
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

  const handleOptions = (name, opt) => {
    const filterOptions = inputs[name].filter((data) => data !== opt);
    setInputs((prevState) => ({
      ...prevState,
      [name]: filterOptions,
    }));
  };

  const resetInputs = () => {
    setInputs({ ...initialInputs });
    isFirstInputs.current = { ...initialRefs };
  };

  //cada vez que cambia el valor de un input
  //se ejecuta esta funcion para validar el valor del input
  useEffect(() => {
    console.log(inputs);
    if (dataName === "profile")
      setErrors(validateProfileForm(inputs, isFirstInputs));
    if (dataName === "academic")
      setErrors(validateAcademicForm(inputs, isFirstInputs));
    if (dataName === "info")
      setErrors(validateInfoForm(inputs, input, isFirstInputs));
  }, [inputs, input]);

  return {
    errors,
    inputs,
    resetInputs,
    handleInputs,
    handleOptions,
    handleSelectChange,
  };
};

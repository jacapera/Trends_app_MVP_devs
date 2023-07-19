import { useEffect, useState } from "react";

export const useRegister = () => {
  const [completedForms, setCompletedForms] = useState({
    profile: false,
    academic: false,
    info: false,
  });

  const handleCompletedForms = (isCompleted, dataName) => {
    setCompletedForms((prevState) => ({
      ...prevState,
      [dataName]: isCompleted,
    }));
  };

  useEffect(() => {
    console.log(completedForms);
  }, [completedForms]);

  return {
    completedForms,
    handleCompletedForms,
  };
};

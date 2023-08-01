import { Button, ProgressBar } from "@tremor/react";
import { ArrowSmLeftIcon } from "@heroicons/react/outline/";
import { useRegister } from "../../hooks/useRegister";

export default function ProfessionalRegisterForm() {

  const {
    data,
    userData,
    forms,
    currentFormIndex,
    checkCompletedForms,
    handlePrevForm,
    handleProgressBar,
    handleSaveData,
    handleUserData,
  } = useRegister();

  const CurrentForm = forms[currentFormIndex];
  const progressValue = handleProgressBar();

  return (
    <div className="flex flex-col gap-4 w-96">
      <h2>Register Form for Professionals</h2>
      <section>
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
      </section>
      <ProgressBar value={progressValue} showAnimation={true} />
    </div>
  );
}

import { useForm } from "../../hooks/useForm";
import CustomInput from "../customTextInput";

export default function AcademicRegister({ setData }) {
  const {
    inputs: academicInputs,
    errors,
    isFormComplete,
    handleSumbit,
    handleSelectChange,
    handleInputs,
  } = useForm(setData, "acedemic");

  return (
    <div className="containerAcademicRegister">
      <form onSubmit={handleSumbit}>
        <h3>Academic Information</h3>
        <CustomInput 
          label={"Full name:"}
          placeholder={"Write your full name..."}
          type={"text"}
          name={"name"}
          value={academicInputs.name}
          error={errors.name}
          handleInput={handleInputs}
        />
      </form>
    </div>
  );
}

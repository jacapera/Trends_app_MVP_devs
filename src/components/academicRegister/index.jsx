import { useForm } from "../../hooks/useForm";

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
      </form>
    </div>
  );
}

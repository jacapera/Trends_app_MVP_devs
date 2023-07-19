import { Button } from "@tremor/react";
import { useForm } from "../../hooks/useForm";
import {CustomMultiTextInput, CustomTextInput} from "../customTextInput";
import { CustomSelect } from "../customSelect";

export default function AcademicRegister({ setData }) {
  const {
    inputs: academicInputs,
    errors,
    isFormComplete,
    handleSumbit,
    handleSelectChange,
    handleInputs,
    handleOptions
  } = useForm(setData, "academic");

  return (
    <div className="containerAcademicRegister">
      <form onSubmit={handleSumbit}>
        <h3>Academic Information</h3>
        <CustomSelect 
          label={"Type of professional:"}
          placeholder={"Select one option..."}
          name={"type"}
          options={["Without experience", "Junior", "Middle", "Senior"]}
          handleSelectChange={handleSelectChange}
          error={errors.type}
          value={academicInputs.type}
        />
        <CustomTextInput 
          label={"Institution:"}
          placeholder={"Enter where you studied..."}
          type={"text"}
          name={"institution"}
          value={academicInputs.institution}
          error={errors.institution}
          handleInput={handleInputs}
        />
        <CustomTextInput 
          label={"Education level:"}
          placeholder={"Primary, Secondary, Tertiary, University..."}
          type={"text"}
          name={"level"}
          value={academicInputs.level}
          error={errors.level}
          handleInput={handleInputs}
        />
        <CustomMultiTextInput 
          label={"Courses Completed:"}
          placeholder={"example: Software Engineer"}
          type={"text"}
          name={"area"}
          values={academicInputs.area}
          error={errors.area}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
          handleOptions={handleOptions}
        />
        <CustomTextInput 
          label={"Graduation year:"}
          placeholder={"example: 2002"}
          type={"text"}
          name={"graduation"}
          value={academicInputs.graduation}
          error={errors.graduation}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
        />
        <Button
          disabled={!isFormComplete}
          type="submit"
          size="lg"
        >
          <span className="text-xl uppercase">Next Step</span>
        </Button>
      </form>
    </div>
  );
}

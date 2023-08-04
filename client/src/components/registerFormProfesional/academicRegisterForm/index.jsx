import { useForm } from "../../../hooks/useForm";
import { CustomMultiTextInput, CustomTextInput } from "../../customTextInput";
import { CustomSelect } from "../../customSelect";
import { useFields } from "../../../hooks/useFields";

export default function AcademicRegister({
  handleUserData,
  dataName,
  checkCompletedForms,
  initialInputs,
  data,
}) {
  const initialRefs = {
    type: true,
    institution: true,
    level: true,
    area: true,
    graduation: true,
  };

  const {
    inputs: academicInputs,
    errors,
    handleInputs,
    handleSelectChange,
    handleOptions,
  } = useFields(initialInputs, initialRefs, dataName, data);

  useForm(
    academicInputs,
    errors,
    dataName,
    checkCompletedForms,
    handleUserData
  );

  return (
    <div className="containerAcademicRegister">
      <form>
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
          handleInput={(event) => handleInputs(event, "options")}
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
      </form>
    </div>
  );
}

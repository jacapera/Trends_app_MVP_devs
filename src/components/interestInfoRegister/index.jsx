import { useFields } from "../../hooks/useFields";
import { useForm } from "../../hooks/useForm";
import { CustomSelect, CustomSelectMultiple } from "../customSelect";
import { CustomMultiTextInput, CustomTextInput } from "../customTextInput";

export default function InterestInfoRegister({
  handleUserData,
  dataName,
  checkCompletedForms,
  initialInputs,
}) {
  const initialRefs = {
    company: true,
    position: true,
    career: true, // responsabilidades, logros
    skills: true,
    interests: true,
    goals: true,
    languages: true,
    availability: true,
    contract: true, // Tipo de contratación
  };

  const {
    inputs: infoInputs,
    errors,
    handleInputs,
    handleSelectChange,
    handleOptions,
  } = useFields(initialInputs, initialRefs, dataName);

  useForm(infoInputs, errors, dataName, checkCompletedForms, handleUserData);

  return (
    <>
      <form>
        <h3>Interests Information</h3>
        <CustomTextInput
          label={"Company:"}
          placeholder={"Enter the company where you worked..."}
          type={"text"}
          name={"company"}
          value={infoInputs.company}
          error={errors.company}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
        />
        <CustomTextInput
          label={"Position:"}
          placeholder={"Enter your position within the company..."}
          type={"text"}
          name={"position"}
          value={infoInputs.position}
          error={errors.position}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
        />
        <CustomMultiTextInput
          label={"Responsibilities and achievements:"}
          placeholder={"Enter your achievements..."}
          type={"text"}
          name={"career"}
          values={infoInputs.career}
          error={errors.career}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
          handleOptions={handleOptions}
        />
        <CustomMultiTextInput
          label={"Relevant skills:"}
          placeholder={"Enter the skills that characterize you..."}
          type={"text"}
          name={"skills"}
          values={infoInputs.skills}
          error={errors.skills}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
          handleOptions={handleOptions}
        />
        <CustomMultiTextInput
          label={"Interests:"}
          placeholder={"Enter your interests..."}
          type={"text"}
          name={"interests"}
          values={infoInputs.interests}
          error={errors.interests}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
          handleOptions={handleOptions}
        />
        <CustomMultiTextInput
          label={"Goals:"}
          placeholder={"Enter your goals..."}
          type={"text"}
          name={"goals"}
          values={infoInputs.goals}
          error={errors.goals}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
          handleOptions={handleOptions}
        />
        <CustomSelectMultiple
          label={"Languages:"}
          placeholder={"Enter the languages you learned..."}
          type={"text"}
          name={"languages"}
          value={infoInputs.languages}
          error={errors.languages}
          handleSelectChange={handleSelectChange}
          options={["Spanish", "English", "Portuguese", "French"]}
        />
        <CustomSelect
          label={"Type of availability:"}
          placeholder={"Select an option.."}
          type={"text"}
          name={"availability"}
          value={infoInputs.availability}
          error={errors.availability}
          handleSelectChange={handleSelectChange}
          options={["Part-Time", "Full-Time"]}
        />
        <CustomSelect
          label={"type of contract:"}
          placeholder={"Select an option.."}
          type={"text"}
          name={"contract"}
          value={infoInputs.contract}
          error={errors.contract}
          handleSelectChange={handleSelectChange}
          options={["Remote", "Hybrid", "Presential"]}
        />
      </form>
    </>
  );
}

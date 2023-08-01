import { useFields } from "../../../hooks/useFields";
import { useForm } from "../../../hooks/useForm";
import { CustomTextInput } from "../../customTextInput";

export default function MainRegister({
  handleUserData,
  dataName,
  checkCompletedForms,
  initialInputs,
  data,
}) {
  const initialRefs = {
    username: true,
    password: true,
  };

  const {
    inputs: contactInputs,
    errors,
    handleInputs,
  } = useFields(initialInputs, initialRefs, dataName, data);

  useForm(contactInputs, errors, dataName, checkCompletedForms, handleUserData);

  return (
    <form>
      <CustomTextInput
        label={"Username:"}
        placeholder={"Write your username..."}
        type={"text"}
        name={"username"}
        value={contactInputs.username}
        error={errors.username}
        handleInput={handleInputs}
      />
      <CustomTextInput
        label={"Password:"}
        placeholder={"Write your password..."}
        type={"password"}
        name={"password"}
        value={contactInputs.password}
        error={errors.password}
        handleInput={handleInputs}
      />
    </form>
  );
}

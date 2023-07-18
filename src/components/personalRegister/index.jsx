/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Select from "react-select";
import { useForm } from "../../hooks/useForm";
import countryList from "react-select-country-list";
import CustomInput from "../customInput";
// import s from "./form.module.css";

//esta funcion es un formulario controlado
//para el registro de un usuario nuevo
export default function PersonalRegister({ setData }) {
  const options = useMemo(() => countryList().getData(), []);

  const {
    isFormComplete,
    inputs : contactInputs,
    errors,
    handleInputs,
    handleSelectChange,
    handleSumbit,
  } = useForm(setData);

  return (
    <div className="containerPersonalRegister">
      <form onSubmit={handleSumbit}>
        <h1>Register Form</h1>
        <h3>Personal Information</h3>
        <CustomInput
          label={"Full name:"}
          placeholder={"Write your full name..."}
          type={"text"}
          name={"name"}
          value={contactInputs.name}
          error={errors.name}
          handleInput={handleInputs}
        />
        <CustomInput
          label={"Username:"}
          placeholder={"Write your username..."}
          type={"text"}
          name={"username"}
          value={contactInputs.username}
          error={errors.username}
          handleInput={handleInputs}
        />
        <CustomInput
          label={"Email:"}
          placeholder={"example@mail.com"}
          type={"email"}
          name={"email"}
          value={contactInputs.email}
          error={errors.email}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
        />
        <CustomInput
          label={"Age:"}
          placeholder={"25"}
          type={"text"}
          name={"age"}
          value={contactInputs.age}
          error={errors.age}
          handleInput={handleInputs}
          handleKeyDown={handleInputs}
        />
        <div>
          <label htmlFor="countries">Country:</label>
          <Select
            name="countries"
            options={options}
            placeholder="Select your country..."
            onChange={handleSelectChange}
            defaultValue={null}
          />
          {errors.country && <span>{errors.country}</span>}
        </div>
        <CustomInput
          label={"City of residence:"}
          placeholder={"Write where you are from..."}
          type={"text"}
          name={"city"}
          value={contactInputs.city}
          error={errors.city}
          handleInput={handleInputs}
        />
        <CustomInput
          label={"Password:"}
          placeholder={"Write your password..."}
          type={"password"}
          name={"password"}
          value={contactInputs.password}
          error={errors.password}
          handleInput={handleInputs}
        />
        <div onChange={handleInputs}>
          <span htmlFor="support">
            Would you share your experience as a student/professional to support
            others?
          </span>
          <CustomInput
            label={"Yes"}
            type={"radio"}
            name={"support"}
            id={"yesSupport"}
            value={"yes"}
            defaultChecked={true}
          />
          <CustomInput
            label={"No"}
            type={"radio"}
            name={"support"}
            id={"noSupport"}
            value={"No"}
          />
          {errors.support && <span>{errors.support}</span>}
        </div>
        <button disabled={!isFormComplete} type="submit">
          continue
        </button>
      </form>
    </div>
  );
}

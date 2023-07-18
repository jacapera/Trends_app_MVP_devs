/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Select from "react-select";
import { useForm } from "../../hooks/useForm";
import countryList from "react-select-country-list";
// import s from "./form.module.css";

//esta funcion es un formulario controlado
//para el registro de un usuario nuevo
export default function CustomForm({ setData }) {
  const options = useMemo(() => countryList().getData(), []);

  const {
    isFormComplete,
    contactInputs,
    errors,
    handleInputs,
    handleSelectChange,
    handleSumbit
  } = useForm(setData);

  return (
    <form onSubmit={handleSumbit}>
      <h1>Register Form</h1>
      <div>
        <label htmlFor="name">Full name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Write your full name..."
          onChange={handleInputs}
          value={contactInputs.name}
        />
        <span>{errors.name}</span>
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Write your username..."
          onChange={handleInputs}
          value={contactInputs.username}
        />
        <span>{errors.username}</span>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          onChange={handleInputs}
          value={contactInputs.email}
        />
        <span>{errors.email}</span>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          name="age"
          id="age"
          placeholder="25"
          onChange={handleInputs}
          value={contactInputs.age}
        />
        <span>{errors.age}</span>
      </div>
      <div>
        <label htmlFor="countries">Country:</label>
        <Select
          name="countries"
          options={options}
          placeholder="Select your country..."
          onChange={handleSelectChange}
          defaultValue={null}
        />
        <span>{errors.country}</span>
      </div>
      <div>
        <label htmlFor="city">City of residence:</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Write where you are from..."
          onChange={handleInputs}
          value={contactInputs.city}
        />
        <span>{errors.city}</span>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Write your password..."
          onChange={handleInputs}
          value={contactInputs.password}
        />
        <span>{errors.password}</span>
      </div>
      <div onChange={handleInputs}>
        <span htmlFor="support">
          Would you share your experience as a student/professional to support
          others?
        </span>
        <label htmlFor="yesSupport">
          Yes
          <input
            type="radio"
            name="support"
            id="yesSupport"
            value="yes"
            defaultChecked={contactInputs.support === "yes"}
          />
        </label>
        <label htmlFor="noSupport">
          No
          <input type="radio" name="support" id="noSupport" value="no" />
        </label>
        <span>{errors.support}</span>
      </div>
      <button disabled={!isFormComplete} type="submit">
        continue
      </button>
    </form>
  );
}

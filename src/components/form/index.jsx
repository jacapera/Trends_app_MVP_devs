/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { validateForm } from "../../utils/validateForm";
import countryList from "react-select-country-list";
import Select from "react-select";
import { objectToFormData } from "../../utils/objectToFormData";
// import s from "./form.module.css";

let prof = {
  profile: {
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    support: true,
  },
  acedemic: {
    type: "", // Sin exp - Junior - Intermedio - Senior
    institution: "",
    level: "",
    degrees: "",
    graduation: new Date(),
  },
  info: {
    company_name: "",
    position: "",
    responsibilities_achievements: "",
    skills: "",
    interests: "",
    goals: "",
    languages: "",
    availability: "",
    contract: "",
  },
};
prof;

//esta funcion es un formulario controlado
//para el registro de un usuario nuevo
export default function CustomForm({ setData }) {
  const options = useMemo(() => countryList().getData(), []);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [contactInputs, setContactInputs] = useState({
    email: "",
    username: "",
    name: "",
    age: "",
    password: "",
    city: "",
    country: "",
    support: "yes",
  });
  const [errors, setErrors] = useState({});
  const isFirstInputs = useRef({
    email: true,
    username: true,
    name: true,
    age: true,
    password: true,
    city: true,
    country: true,
  });

  //cada vez que cambia el valor de un input
  //se ejecuta esta funcion para validar el valor del input
  useEffect(() => {
    setErrors(validateForm(contactInputs, isFirstInputs));
  }, [contactInputs]);

  //esta funcion esta a la espera de que no haya mas errores
  //para asi poder saber cuando el formulario se completó correctamente
  useEffect(() => {
    setIsFormComplete(
      Object.entries(contactInputs).every(([, value]) => value !== "") &&
        Object.keys(errors).length === 0
    );
  }, [errors, contactInputs]);

  //cada vez que cambia el valor de un input se ejecuta esta funcion
  const handleInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContactInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const label = event.label;
    setContactInputs((prevState) => ({
      ...prevState,
      country: label,
    }));
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    if (isFormComplete) {
      const formData = objectToFormData(contactInputs);
      setData(formData);
      setContactInputs({
        email: "",
        username: "",
        name: "",
        age: "",
        password: "",
        city: "",
        country: "",
        support: "yes",
      });
      isFirstInputs.current = {
        email: true,
        username: true,
        name: true,
        age: true,
        password: true,
        city: true,
        country: true,
      };
    } else {
      alert("Error! Missing data.");
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <h1>Test Form</h1>
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
            checked={contactInputs.support === "yes"}
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

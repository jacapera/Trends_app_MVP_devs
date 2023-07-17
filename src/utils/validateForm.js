const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGEX_NUMBERS = /^\d+$/;
const REGEX_FULLNAME = /^[A-Za-z]+\s([A-Za-z]+\s)*[A-Za-z]+\s?$/;
const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const REGEX_CITIES = /^[A-Za-z\u00C0-\u017F\s',-]+$/;

//Funcion de manejo de errores

export function validateForm(inputs, isFirstInputs) {
  const errors = {};

  const validateRequiredField = (field) => {
    if (isFirstInputs.current[field]) {
      isFirstInputs.current[field] = inputs[field] === "";
    } else if (inputs[field] === "") {
      errors[field] = "This field is required.";
    }
    return isFirstInputs.current[field];
  };

  //manejo de errores del nombre
  if (!validateRequiredField("name") && inputs.name !== "") {
    if (!REGEX_FULLNAME.test(inputs.name)) {
      errors.name = "Enter a valid full name.";
    } else if (inputs.name.length > 35) {
      errors.name = "Maximum characters allowed: 35.";
    }
  }

  //manejo de errores del mail
  if (!validateRequiredField("email") && inputs.email !== "") {
    if (!REGEX_EMAIL.test(inputs.email)) {
      errors.email = "Email format not allowed.";
    }
  }

  //manejo de errores del username
  if (!validateRequiredField("username") && inputs.username !== "") {
    if (inputs.username.length < 4 || inputs.username.length > 30) {
      errors.username = "Username must be between 4 and 30 characters.";
    }
  }

  //manejo de errores de la edad
  if (!validateRequiredField("age") && inputs.age !== "") {
    if (!REGEX_NUMBERS.test(inputs.age)) {
      errors.age = "Only numbers are allowed.";
    } else if (inputs.age < 18 || inputs.age > 65) {
      errors.age = "You have to be between 18 and 65 years old.";
    }
  }

  //manejo de errores del password
  if (!validateRequiredField("password") && inputs.password !== "") {
    if (!REGEX_PASSWORD.test(inputs.password)) {
      errors.password =
        "The password must be at least 8 characters long, including at least one letter, one number, and one special character.";
    }
  }

  //manejo de errores del input city
  if (!validateRequiredField("city") && inputs.city !== "") {
    if (!REGEX_CITIES.test(inputs.city)) {
      errors.city = "Numbers not allowed.";
    } else if (inputs.city.length > 35) {
      errors.city = "Maximum characters allowed: 40.";
    }
  }

  //manejo de errores de los inputs support
  if (inputs.support === "") {
    errors.support = "This field is required/";
  }

  //manejo de errores del input country
  validateRequiredField("country");

  return errors;
}

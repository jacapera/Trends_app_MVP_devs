const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGEX_NUMBERS = /^\d+$/;
const REGEX_LETTERS_SPACES = /^[A-Za-z\s]+$/;
const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const REGEX_CITIES = /^[A-Za-z\u00C0-\u017F\s',-]+$/;
const REGEX_SENTENCE = /^[\w\s.,'"-]+$/;

//Funcion de manejo de errores

export function validateProfileForm(inputs, isFirstInputs) {
  const errors = {};

  const validateRequiredField = (field) => {
    if (isFirstInputs.current[field]) {
      isFirstInputs.current[field] = inputs[field].length === 0;
    } else if (inputs[field] === "") {
      errors[field] = "This field is required.";
    }
    return isFirstInputs.current[field];
  };

  //manejo de errores del nombre
  if (!validateRequiredField("name") && inputs.name !== "") {
    if (!REGEX_LETTERS_SPACES.test(inputs.name)) {
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
      errors.age = "Only positive integers are allowed.";
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
    errors.support = "This field is required.";
  }

  //manejo de errores del input country
  validateRequiredField("country");

  return errors;
}

//validaciones para datos academicos
export function validateAcademicForm(inputs, isFirstInputs) {
  const errors = {};

  const validateRequiredField = (field) => {
    if (isFirstInputs.current[field]) {
      isFirstInputs.current[field] = inputs[field].length === 0;
    } else if (inputs[field].length === 0) {
      errors[field] = "This field is required.";
    }
    return isFirstInputs.current[field];
  };

  //manejo de errores de la institucion educativa
  if (!validateRequiredField("institution") && inputs.institution !== "") {
    if (!REGEX_SENTENCE.test(inputs.institution)) {
      errors.institution = "Special characters not allowed.";
    } else if (inputs.institution.length > 50) {
      errors.institution = "Maximum characters allowed: 50.";
    }
  }

  //manejo de errores del nivel educativo
  if (!validateRequiredField("level") && inputs.level !== "") {
    if (!REGEX_LETTERS_SPACES.test(inputs.level)) {
      errors.level = "Numbers and special characters not allowed.";
    } else if (inputs.level.length > 20) {
      errors.level = "Maximum characters allowed: 20.";
    }
  }

  //manejo de errores de la edad
  if (!validateRequiredField("graduation") && inputs.graduation !== "") {
    const currentYear = new Date().getFullYear();
    if (!REGEX_NUMBERS.test(inputs.graduation)) {
      errors.graduation = "Only positive integers are allowed.";
    } else if (inputs.graduation < 1980) {
      errors.graduation = "Minimum year allowed: 1980";
    } else if (inputs.graduation > currentYear - 1) {
      errors.graduation = `Maximum year allowed: ${currentYear - 1}`;
    }
  }

  //manejo de errores de las carreras
  validateRequiredField("area");

  //manejo de errores del input type
  validateRequiredField("type");

  return errors;
}

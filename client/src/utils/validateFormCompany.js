export default function ValidationFormCompany(input) {
  const error = {};
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexpassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?& ]{8,}$/;

  //valido email
  if (!regexEmail.test(input.email)) {
    error.email = "Debe ingresar un mail valido";
  }
  if (!input.email) {
    error.email = "Debe ingresar un mail";
  }

  //valido password
  if(!regexpassword.test(input.password)){
    error.password = "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra, un número y un carácter especial.";
  }

  //
  return error;
}

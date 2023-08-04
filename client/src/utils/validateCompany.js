export function validateContact(state) {
  const {
    company_name,
    cuit,
    email,
    city,
    country,
    website,
    usuario,
    password,
  } = state;
  const contacto = {
    company_name,
    cuit,
    email,
    city,
    country,
    website,
    usuario,
    password,
  };

  for (let propiedad in contacto) {
    if (contacto[propiedad] === "") return false;
  }
  return true;
}

export function errorContact(error) {
  const {
    company_name,
    cuit,
    email,
    city,
    country,
    website,
    usuario,
    password,
  } = error;
  const errorContactState = {
    company_name,
    cuit,
    email,
    city,
    country,
    website,
    usuario,
    password,
  };

  for (let propiedad in errorContactState) {
    if (
      errorContactState[propiedad] !== "" &&
      errorContactState[propiedad] !== undefined
    )
      return false;
  }
  return true;
}

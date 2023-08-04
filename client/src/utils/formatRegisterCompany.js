export default function formatRegisterCompany(state) {
  const format = {
      type:"company",
      company_name: state.company_name, //"Coca Cola", //Denominacion legal o marca comercial
      cuit: state.cuit, //"27303255418",
      email: state.email, //"admin@cocacola.com",
      city: state.city, //"Buenos Aires", //Ubicacion
      country: state.country, //"Argentina",
      website: state.website, //"https://cocacola.com.ar",
      username: state.usuario, //"cocacola23",
      password: state.password, //"contraseña123",
      bio:"",
      image:"",
  };

  return format;
}

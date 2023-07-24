export default function formatRegisterCompany(state){
    const format = {
        profile: {
            company_name: state.company_name,//"Coca Cola", //Denominacion legal o marca comercial
            cuit: state.cuit, //"27303255418",
            email: state.email,//"admin@cocacola.com",
            city: state.city,//"Buenos Aires", //Ubicacion
            country: state.country,//"Argentina", 
            website: state.website,//"https://cocacola.com.ar",
            username: state.usuario,//"cocacola23",
            password: state.password,//"contraseña123",
      },
      academic: {
          level_required: state.level_required,//"Avanzado", //Nivel educacion requerida
        study_area: state.study_area.split(','),//["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
        experience_required: state.experience_required, //"3", //Experiencia requerida
        industry: state.industry.split(','), //["Finanzas y Banca","TI"], //Industria/Sector
      },
      info: {
          benefits: state.benefits.split(','), //["Planes de seguro de salud","Flexibilidad laboral"], //Beneficios otorgados por la empresa
        skills_required: state.skills_required.split(','),//["Programación en Python", "Desarrollo web", "Bases de datos"],
        job_description: state.job_description.split(','),//["Inteligencia Artificial","Desarrollo de aplicaciones móviles"], //Descripcion responsabilidades del puesto
        job_goal: state.job_goal.split(','), //["Obtener una pasantía en una empresa de tecnología","Desarrollar habilidades de liderazgo"], //Objetivos y metas del trabajo propuesto
        languages_required: state.languages_required.split(','),//["Español", "Inglés"],
        availability: state.availability,//"Full-time",
        contract_offered: state.contract_offered,//"Remoto",
      },
        };
    
    return format;

};
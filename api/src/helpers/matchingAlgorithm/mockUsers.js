/**
 * professional goals:
 * Conseguir un trabajo, Conocer más sobre el mercado laboral de mi profesión, Conocer nuevos colegas y oportunidades, Hacer una especialización, Emprender
 *
 * professional problematic:
 * Falta de información del mercado laboral, Falta de guía profesional, Dificultad para conseguir trabajo
 *
 *
 * student goals:
 * Elegir una carrera, Encontrar una pasantía o trabajo, Conocer más sobre el mercado laboral de mi profesión, Profundizar en mis estudios, Elegir una especialización, Conocer nuevos colegas y oportunidades
 *
 * student problematic:
 * No sé que es lo que me gusta, Falta de información del mercado laboral, Falta de guía profesional, Dificultad para conseguir trabajo
 */

const student1 = {
  type: "student",
  name: "Juan Perez",
  username: "juanperez",
  email: "juan.perez@example.com",
  password: "contraseña123",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2003-05-21",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Buenos Aires",
  profile_country: "Argentina",
  profile_support: true,
  academic_formation: "Universitario Avanzado",
  academic_institution: "Universidad Nacional de Buenos Aires",
  academic_level: "En curso",
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2023",
  info_career: ["Desarrollo de Software"],
  info_skills: ["Programación en Python", "Desarrollo web", "Bases de datos"],
  info_goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
  info_interests: [
    "Inteligencia Artificial",
    "Desarrollo de aplicaciones móviles",
  ],
  info_problematic: [
    "Falta de información del mercado laboral",
    "Falta de guía profesional",
  ],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student2 = {
  type: "student",
  name: "Maria Sanchez",
  username: "mariasanchez",
  email: "maria.sanchez@example.com",
  password: "password456",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2003-05-12",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Madrid",
  profile_country: "España",
  profile_support: false,
  academic_formation: "Universitario Intermedio",
  academic_institution: "Universidad Complutense de Madrid",
  academic_level: "En curso",
  academic_area: ["Administración de Empresas"],
  academic_graduation: "2023",
  info_career: ["Recursos Humanos"],
  info_skills: [
    "Gestión del talento",
    "Entrevistas de selección",
    "Administración de personal",
  ],
  info_goals: ["Profundizar en mis estudios", "Elegir una especialización"],
  info_interests: ["Desarrollo profesional", "Coaching"],
  info_problematic: ["Falta de guía profesional"],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student3 = {
  type: "student",
  name: "John Smith",
  username: "johnsmith",
  email: "john.smith@example.com",
  password: "password789",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2003-05-12",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "New York",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Universitario Junior",
  academic_institution: "New York University",
  academic_level: "Principiante",
  academic_area: ["Psicología"],
  academic_graduation: "2023",
  info_career: ["Psicoterapia"],
  info_skills: [
    "Entrevistas clínicas",
    "Terapia cognitivo-conductual",
    "Manejo de casos",
  ],
  info_goals: ["Profundizar en mis estudios", "Elegir una especialización"],
  info_interests: [
    "Investigación en neurociencia",
    "Tratamiento de trastornos de ansiedad",
  ],
  info_problematic: [
    "No sé que es lo que me gusta",
    "Falta de guía profesional",
  ],
  info_languages: ["Inglés", "Español"],
  info_availability: "Part-time",
  info_contract: "Remoto",
};

const student4 = {
  type: "student",
  name: "Laura Johnson",
  username: "laurajohnson",
  email: "laura.johnson@example.com",
  password: "qwerty123",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2007-01-12",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "London",
  profile_country: "United Kingdom",
  profile_support: false,
  academic_formation: "Secundaria",
  academic_institution: "London High School",
  academic_level: "Principiante",
  academic_area: ["Derecho"],
  academic_graduation: "2023",
  info_career: ["Abogacía"],
  info_skills: ["Litigio"],
  info_goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
  info_interests: ["Derecho laboral"],
  info_problematic: ["Dificultad para conseguir trabajo"],
  info_languages: ["Español"],
  info_availability: "Part-Time",
  info_contract: "Remoto",
};

const student5 = {
  type: "student",
  name: "Carlos Fernández",
  username: "carlosfernandez",
  email: "carlos.fernandez@example.com",
  password: "contraseña456",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2000-02-12",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Mexico City",
  profile_country: "Mexico",
  profile_support: true,
  academic_formation: "Universitario Avanzado",
  academic_institution: "Universidad Nacional Autónoma de México",
  academic_level: "Avanzado",
  academic_area: ["Derecho"],
  academic_graduation: "2023",
  info_career: ["Abogacía"],
  info_skills: ["Investigación jurídica", "Litigio", "Redacción legal"],
  info_goals: [
    "Encontrar una pasantía o trabajo",
    "Conocer más sobre el mercado laboral de mi profesión",
    "Profundizar en mis estudios",
  ],
  info_interests: ["Derecho internacional", "Propiedad intelectual"],
  info_problematic: [
    "No sé que es lo que me gusta",
    "Falta de información del mercado laboral",
  ],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student6 = {
  type: "student",
  name: "Juan Gomez",
  username: "juan",
  email: "juan@email.com",
  password: "1234",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2000-02-02",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Cartagena",
  profile_country: "Colombia",
  profile_support: true,
  academic_formation: "Secundaria",
  academic_institution: "Instituto Superior de Enseñanza Inferior",
  academic_level: "En curso",
  academic_area: ["Finanzas", "Marketing"],
  academic_graduation: "2023",
  info_career: ["Perito mercantil"],
  info_skills: ["Contabilidad", "Gestión"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Encontrar una pasantía o trabajo",
  ],
  info_interests: ["Marketing internacional"],
  info_problematic: ["Dificultad para conseguir trabajo"],
  info_languages: ["Inglés", "Español"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student7 = {
  type: "student",
  name: "Jonathan Leroy",
  username: "jonathan",
  email: "jona@example.com",
  password: "qwerty",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2000-02-02",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Secundaria",
  academic_institution: "University of California, Berkeley",
  academic_level: "Principiante",
  academic_area: ["Finanzas"],
  academic_graduation: "2023",
  info_career: ["Análisis de inversiones"],
  info_skills: [
    "Modelado financiero",
    "Análisis de riesgos",
    "Conocimientos en mercado de capitales",
  ],
  info_goals: ["Profundizar en mis estudios", "Elegir una especialización"],
  info_interests: ["Mercado de valores", "Inversiones sostenibles"],
  info_problematic: [
    "Falta de guía profesional",
    "Dificultad para conseguir trabajo",
  ],
  info_languages: ["Español"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const professional1 = {
  type: "professional",
  name: "Ana Rodriguez",
  username: "anarodriguez",
  email: "ana.rodriguez@example.com",
  password: "password123",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "1997-03-01",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Madrid",
  profile_country: "España",
  profile_support: true,
  academic_formation: "Senior",
  academic_institution: "Universidad Autónoma de Madrid",
  academic_area: ["Marketing"],
  academic_graduation: "2000",
  info_company_name: "ABC Marketing Agency",
  info_position: "Gerente de Marketing",
  info_career: [
    "Desarrollo e implementación de estrategias de marketing",
    "Gestión de equipos y proyectos",
    "Incremento de la visibilidad de la marca",
  ],
  info_skills: [
    "Marketing digital",
    "Planificación estratégica",
    "Análisis de datos",
  ],
  info_interests: ["Marketing de contenidos", "Inteligencia de mercado"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Conocer nuevos colegas y oportunidades",
  ],
  info_problematic: ["Falta de información del mercado laboral"],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const professional2 = {
  type: "professional",
  name: "Michael Brown",
  username: "michaelbrown",
  email: "michael.brown@example.com",
  password: "password456",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "1997-06-07",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "New York",
  profile_country: "United States",
  profile_support: false,
  academic_formation: "Middle",
  academic_institution: "Stanford University",
  academic_area: ["Ingeniería de Software"],
  academic_graduation: "2000",
  info_company_name: "XYZ Tech Solutions",
  info_position: "Ingeniero de Software",
  info_career: [
    "Desarrollo de aplicaciones web y móviles",
    "Colaboración en equipos de desarrollo ágiles",
    "Optimización de rendimiento de software",
  ],
  info_skills: [
    "Programación en Java",
    "Desarrollo de APIs",
    "Pruebas automatizadas",
  ],
  info_interests: [
    "Inteligencia Artificial",
    "Desarrollo de aplicaciones híbridas",
  ],
  info_goals: ["Hacer una especialización", "Emprender"],
  info_languages: ["Inglés"],
  info_availability: "Full-time",
  info_contract: "Híbrido",
};

const professional3 = {
  type: "professional",
  name: "Sophie Martin",
  username: "sophiemartin",
  email: "sophie.martin@example.com",
  password: "qwerty123",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "1997-03-01",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Paris",
  profile_country: "France",
  profile_support: true,
  academic_formation: "Junior",
  academic_institution: "Sorbonne University",
  level: "Principiante",
  academic_area: ["Psicología"],
  academic_graduation: "2000",
  info_company_name: "ABC Consulting",
  info_position: "Consultora de Recursos Humanos",
  info_career: [
    "Evaluación y selección de personal",
    "Desarrollo de planes de capacitación",
    "Gestión del clima laboral",
  ],
  info_skills: [
    "Entrevistas de selección",
    "Gestión del talento",
    "Capacitación y desarrollo",
  ],
  info_interests: ["Psicología organizacional", "Desarrollo de liderazgo"],
  info_goals: ["Conocer nuevos colegas y oportunidades"],
  info_problematic: ["Falta de información del mercado laboral"],
  info_languages: ["Francés", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Híbrido",
};

const professional4 = {
  type: "professional",
  name: "David Lee",
  username: "davidlee",
  email: "david.lee@example.com",
  password: "password789",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2005-10-20",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Sin Experiencia",
  academic_institution: "University of California, Berkeley",
  academic_area: ["Finanzas"],
  academic_graduation: "2000",
  info_company_name: "",
  info_position: "",
  info_career: [
    "Análisis de inversiones",
    "Elaboración de informes financieros",
    "Gestión de carteras",
  ],
  info_skills: [
    "Modelado financiero",
    "Análisis de riesgos",
    "Conocimientos en mercado de capitales",
  ],
  info_interests: ["Mercado de valores", "Inversiones sostenibles"],
  info_goals: [
    "Conseguir un trabajo",
    "Conocer más sobre el mercado laboral de mi profesión",
  ],
  info_problematic: [
    "Falta de información del mercado laboral",
    "Dificultad para conseguir trabajo",
  ],
  info_languages: ["Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional5 = {
  type: "professional",
  name: "Maria Garcia",
  username: "mariagarcia",
  email: "maria.garcia@example.com",
  password: "contraseña456",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2007-01-12",
  profile_image:
    "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  profile_city: "Madrid",
  profile_country: "España",
  profile_support: false,
  academic_formation: "Senior",
  academic_institution: "IE Business School",
  academic_area: ["Dirección de Empresas"],
  academic_graduation: "2000",
  info_company_name: "ABC Consulting",
  info_position: "Consultora de Estrategia",
  info_career: [
    "Análisis de mercado y competencia",
    "Desarrollo e implementación de estrategias empresariales",
    "Gestión de las organizaciones",
  ],
  info_skills: [
    "Análisis estratégico",
    "Planificación empresarial",
    "Facilitación de talleres",
  ],
  info_interests: ["Transformación digital", "Innovación empresarial"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Conocer nuevos colegas y oportunidades",
  ],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const company1 = {
  type: "company",
  data: {
    company_name: "Coca Cola",
    cuit: "27303255418",
    website: "https://cocacola.com.ar/",
    bio: "",
    image: "",
    username: "juanperez",
    email: "coca.cola@example.com",
    password: "contraseña123",
    city: "Buenos Aires",
    country: "Argentina",
  },
  jobs: [
    {
      id: "1",
      jobName: "Programador Senior en Python",
      creationDate: "",
      closingDate: "",
      active: true,
      levelRequired: "Avanzado", //Nivel educacion requerida
      studyArea: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
      exprienceRequired: "3", //Experiencia requerida
      industry: ["Finanzas y Banca", "TI"], //Industria/Sector
      benefits: ["Planes de seguro de salud", "Flexibilidad laboral"],
      skillsRequired: [
        "Programación en Python",
        "Desarrollo web",
        "Bases de datos",
      ],
      jobDescription: [
        "Inteligencia Artificial",
        "Desarrollo de aplicaciones móviles",
      ],
      jobGoal: [
        "Obtener una pasantía en una empresa de tecnología",
        "Desarrollar habilidades de liderazgo",
      ],
      languagesRequired: ["Español", "Inglés"],
      languagesRequired: "Full-time",
      contractOffered: "Remoto",
    },
    {
      id: "2",
      jobName: "Arquitecto de Aplicaciones",
      creationDate: "",
      closingDate: "",
      active: true,
      levelRequired: "Avanzado", //Nivel educacion requerida
      studyArea: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
      exprienceRequired: "5", //Experiencia requerida
      industry: ["Servicios TI", "Consultoria de TI"], //Industria/Sector
      benefits: ["Planes de seguro de salud", "Flexibilidad laboral"],
      skillsRequired: ["C#", ".NET", "Java", "UML"],
      jobDescription: [
        "Arquitecto de Aplicación",
        "Experiencia en metodologías Agiles y DevSecOps",
      ],
      jobGoal: ["liderazgo", "atencion al detalle", "calidad del software"],
      info_languages: ["Español", "Inglés"],
      languagesRequired: "Full-time",
      contractOffered: "Presencial",
    },
  ],
};

const professionals = [
  professional1,
  professional2,
  professional3,
  professional4,
  professional5,
];

const students = [
  student1,
  student2,
  student3,
  student4,
  student5,
  student6,
  student7,
];

const companies = [company1];

module.exports = {
  professionals,
  students,
  companies,
};

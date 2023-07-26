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
  profile: {
    name: "Juan Perez",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "juanperez",
    age: "21",
    email: "juan.perez@example.com",
    password: "contraseña123",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    city: "Buenos Aires",
    country: "Argentina",
    support: true,
  },
  academic: {
    type: "Universitario Avanzado",
    institution: "Universidad Nacional de Buenos Aires",
    level: "En curso",
    area: ["Ingeniería Informática"],
    graduation: "2023",
  },
  info: {
    career: ["Desarrollo de Software"],
    skills: ["Programación en Python", "Desarrollo web", "Bases de datos"],
    goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
    interests: [
      "Inteligencia Artificial",
      "Desarrollo de aplicaciones móviles",
    ],
    problematic: [
      "Falta de información del mercado laboral",
      "Falta de guía profesional",
    ],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student2 = {
  profile: {
    name: "Maria Sanchez",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "mariasanchez",
    age: "21",
    email: "maria.sanchez@example.com",
    password: "password456",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    city: "Madrid",
    country: "España",
    support: false,
  },
  academic: {
    type: "Universitario Intermedio",
    institution: "Universidad Complutense de Madrid",
    level: "En curso",
    area: ["Administración de Empresas"],
    graduation: "2023",
  },
  info: {
    career: ["Recursos Humanos"],
    skills: [
      "Gestión del talento",
      "Entrevistas de selección",
      "Administración de personal",
    ],
    goals: ["Profundizar en mis estudios", "Elegir una especialización"],
    interests: ["Desarrollo profesional", "Coaching"],
    problematic: ["Falta de guía profesional"],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student3 = {
  profile: {
    name: "John Smith",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "johnsmith",
    age: "21",
    email: "john.smith@example.com",
    password: "password789",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    city: "New York",
    country: "United States",
    support: true,
  },
  academic: {
    type: "Universitario Junior",
    institution: "New York University",
    level: "Principiante",
    area: ["Psicología"],
    graduation: "2023",
  },
  info: {
    career: ["Psicoterapia"],
    skills: [
      "Entrevistas clínicas",
      "Terapia cognitivo-conductual",
      "Manejo de casos",
    ],
    goals: ["Profundizar en mis estudios", "Elegir una especialización"],
    interests: [
      "Investigación en neurociencia",
      "Tratamiento de trastornos de ansiedad",
    ],
    problematic: ["No sé que es lo que me gusta", "Falta de guía profesional"],
    languages: ["Inglés", "Español"],
    availability: "Part-time",
    contract: "Remoto",
  },
};

const student4 = {
  profile: {
    name: "Laura Johnson",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "laurajohnson",
    age: "21",
    email: "laura.johnson@example.com",
    password: "qwerty123",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    city: "London",
    country: "United Kingdom",
    support: false,
  },
  academic: {
    type: "Secundaria",
    institution: "London High School",
    level: "Principiante",
    area: ["Derecho"],
    graduation: "2023",
  },
  info: {
    career: ["Abogacía"],
    skills: ["Litigio"],
    goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
    interests: ["Derecho laboral"],
    problematic: ["Dificultad para conseguir trabajo"],
    languages: ["Español"],
    availability: "Part-Time",
    contract: "Remoto",
  },
};

const student5 = {
  profile: {
    name: "Carlos Fernández",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "carlosfernandez",
    age: "21",
    email: "carlos.fernandez@example.com",
    password: "contraseña456",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    
    city: "Mexico City",
    country: "Mexico",
    support: true,
  },
  academic: {
    type: "Universitario Avanzado",
    institution: "Universidad Nacional Autónoma de México",
    level: "Avanzado",
    area: ["Derecho"],
    graduation: "2023",
  },
  info: {
    career: ["Abogacía"],
    skills: ["Investigación jurídica", "Litigio", "Redacción legal"],
    goals: [
      "Encontrar una pasantía o trabajo",
      "Conocer más sobre el mercado laboral de mi profesión",
      "Profundizar en mis estudios",
    ],
    interests: ["Derecho internacional", "Propiedad intelectual"],
    problematic: [
      "No sé que es lo que me gusta",
      "Falta de información del mercado laboral",
    ],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student6 = {
  profile: {
    name: "Juan Gomez",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "juan",
    age: "21",
    email: "juan@email.com",
    password: "1234",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    city: "Cartagena",
    country: "Colombia",
    support: true,
  },
  academic: {
    type: "Secundaria",
    institution: "Instituto Superior de Enseñanza Inferior",
    level: "En curso",
    area: ["Finanzas", "Marketing"],
    graduation: "2023",
  },
  info: {

    career: ["Perito mercantil"],

    skills: ["Contabilidad", "Gestión"],
    goals: [
      "Conocer más sobre el mercado laboral de mi profesión",
      "Encontrar una pasantía o trabajo",
    ],
    interests: ["Marketing internacional"],
    problematic: ["Dificultad para conseguir trabajo"],
    languages: ["Inglés", "Español"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student7 = {
  profile: {
    name: "Jonathan Leroy",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "jonathan",
    age: "21",
    email: "jona@example.com",
    password: "qwerty",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    
    city: "San Francisco",
    country: "United States",
    support: true,
  },
  academic: {
    type: "Secundaria",
    institution: "University of California, Berkeley",
    level: "Principiante",
    area: ["Finanzas"],
    graduation: "2023",
  },
  info: {
    career: ["Análisis de inversiones"],
    skills: [
      "Modelado financiero",
      "Análisis de riesgos",
      "Conocimientos en mercado de capitales",
    ],
    goals: ["Profundizar en mis estudios", "Elegir una especialización"],
    interests: ["Mercado de valores", "Inversiones sostenibles"],
    problematic: [
      "Falta de guía profesional",
      "Dificultad para conseguir trabajo",
    ],
    languages: ["Español"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const professional1 = {
  profile: {
    name: "Ana Rodriguez",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "anarodriguez",
    age: "21",
    email: "ana.rodriguez@example.com",
    password: "password123",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    city: "Madrid",
    country: "España",
    support: true,
  },
  academic: {
    type: "Senior",
    institution: "Universidad Autónoma de Madrid",
    area: ["Marketing"],
    graduation: "2000",
  },
  info: {
    company_name: "ABC Marketing Agency",
    position: "Gerente de Marketing",
    career: [
      "Desarrollo e implementación de estrategias de marketing",
      "Gestión de equipos y proyectos",
      "Incremento de la visibilidad de la marca",
    ],
    skills: [
      "Marketing digital",
      "Planificación estratégica",
      "Análisis de datos",
    ],
    interests: ["Marketing de contenidos", "Inteligencia de mercado"],
    goals: [
      "Conocer más sobre el mercado laboral de mi profesión",
      "Conocer nuevos colegas y oportunidades",
    ],
    problematic: ["Falta de información del mercado laboral"],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const professional2 = {
  profile: {
    name: "Michael Brown",

    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "michaelbrown",
    age: "21",
    email: "michael.brown@example.com",
    password: "password456",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    
    city: "New York",
    country: "United States",
    support: false,
  },
  academic: {
    type: "Middle",
    institution: "Stanford University",
    area: ["Ingeniería de Software"],
    graduation: "2000",
  },
  info: {
    company_name: "XYZ Tech Solutions",
    position: "Ingeniero de Software",
    career: [
      "Desarrollo de aplicaciones web y móviles",
      "Colaboración en equipos de desarrollo ágiles",
      "Optimización de rendimiento de software",
    ],
    skills: [
      "Programación en Java",
      "Desarrollo de APIs",
      "Pruebas automatizadas",
    ],
    interests: [
      "Inteligencia Artificial",
      "Desarrollo de aplicaciones híbridas",
    ],
    goals: ["Hacer una especialización", "Emprender"],
    languages: ["Inglés"],
    availability: "Full-time",
    contract: "Híbrido",
  },
};

const professional3 = {
  profile: {
    name: "Sophie Martin",

    
    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "sophiemartin",
    age: "21",
    email: "sophie.martin@example.com",
    password: "qwerty123",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    
    city: "Paris",
    country: "France",
    support: true,
  },
  academic: {
    type: "Junior",
    institution: "Sorbonne University",
    level: "Principiante",
    area: ["Psicología"],
    graduation: "2000",
  },
  info: {
    company_name: "ABC Consulting",
    position: "Consultora de Recursos Humanos",
    career: [
      "Evaluación y selección de personal",
      "Desarrollo de planes de capacitación",
      "Gestión del clima laboral",
    ],
    skills: [
      "Entrevistas de selección",
      "Gestión del talento",
      "Capacitación y desarrollo",
    ],
    interests: ["Psicología organizacional", "Desarrollo de liderazgo"],
    goals: ["Conocer nuevos colegas y oportunidades"],

    problematic: ["Falta de información del mercado laboral"],

    
    languages: ["Francés", "Inglés"],
    availability: "Full-time",
    contract: "Híbrido",
  },
};

const professional4 = {
  profile: {
    name: "David Lee",

    
    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "davidlee",
    age: "21",
    email: "david.lee@example.com",
    password: "password789",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    
    city: "San Francisco",
    country: "United States",
    support: true,
  },
  academic: {
    type: "Sin Experiencia",
    institution: "University of California, Berkeley",
    area: ["Finanzas"],
    graduation: "2000",
  },
  info: {
    company_name: "",
    position: "",
    career: [
      "Análisis de inversiones",
      "Elaboración de informes financieros",
      "Gestión de carteras",
    ],
    skills: [
      "Modelado financiero",
      "Análisis de riesgos",
      "Conocimientos en mercado de capitales",
    ],
    interests: ["Mercado de valores", "Inversiones sostenibles"],
    goals: [
      "Conseguir un trabajo",
      "Conocer más sobre el mercado laboral de mi profesión",
    ],
    problematic: [
      "Falta de información del mercado laboral",
      "Dificultad para conseguir trabajo",
    ],
    languages: ["Inglés"],
    availability: "Full-time",
    contract: "Presencial",
  },
};

const professional5 = {
  profile: {
    name: "Maria Garcia",

    
    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
    username: "mariagarcia",
    age: "21",
    email: "maria.garcia@example.com",
    password: "contraseña456",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",

    
    city: "Madrid",
    country: "España",
    support: false,
  },
  academic: {
    type: "Senior",
    institution: "IE Business School",
    area: ["Dirección de Empresas"],
    graduation: "2000",
  },
  info: {
    company_name: "ABC Consulting",
    position: "Consultora de Estrategia",
    career: [
      "Análisis de mercado y competencia",
      "Desarrollo e implementación de estrategias empresariales",
      "Gestión de las organizaciones",
    ],
    skills: [
      "Análisis estratégico",
      "Planificación empresarial",
      "Facilitación de talleres",
    ],
    interests: ["Transformación digital", "Innovación empresarial"],
    goals: [
      "Conocer más sobre el mercado laboral de mi profesión",
      "Conocer nuevos colegas y oportunidades",
    ],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const company1 = {
  profile: {

    
    company_name: "Coca Cola",
    cuit: "27303255418",
    website: "https://cocacola.com.ar",
    bio: "Somos una empresa de bien",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
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
      academic: {
        level_required: "Avanzado", //Nivel educacion requerida
        study_area: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
        experience_required: "3", //Experiencia requerida
        industry: ["Finanzas y Banca", "TI"], //Industria/Sector
      },
      info: {
        benefits: ["Planes de seguro de salud", "Flexibilidad laboral"],
        skills_required: [
          "Programación en Python",
          "Desarrollo web",
          "Bases de datos",
        ],
        job_description: [
          "Inteligencia Artificial",
          "Desarrollo de aplicaciones móviles",
        ],
        job_goal: [
          "Obtener una pasantía en una empresa de tecnología",
          "Desarrollar habilidades de liderazgo",
        ],
        languages_required: ["Español", "Inglés"],
        availability: "Full-time",
        contract_offered: "Remoto",
      },
    },
    {
      id: "2",
      jobName: "Arquitecto de Aplicaciones",
      academic: {
        level_required: "Avanzado", //Nivel educacion requerida
        study_area: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
        experience_required: "5", //Experiencia requerida
        industry: ["Servicios TI", "Consultoria de TI"], //Industria/Sector
      },
      info: {
        benefits: ["Planes de seguro de salud", "Flexibilidad laboral"],
        skills_required: ["C#", ".NET", "Java", "UML"],
        job_description: [
          "Arquitecto de Aplicación",
          "Experiencia en metodologías Agiles y DevSecOps",
        ],
        job_goal: ["liderazgo", "atencion al detalle", "calidad del software"],
        languages_required: ["Español", "Inglés"],
        availability: "Full-time",
        contract_offered: "Presencial",
      },
    },
  ],

  
};

export const professionals = [
  professional1,
  professional2,
  professional3,
  professional4,
  professional5,
];

export const students = [
  student1,
  student2,
  student3,
  student4,
  student5,
  student6,
  student7,
];

export const companies = [company1];

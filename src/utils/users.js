const student1 = {
  profile: {
    name: "Juan Perez",
    username: "juanperez",
    email: "juan.perez@example.com",
    password: "contraseña123",
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
    goals: [
      "Obtener una pasantía en una empresa de tecnología",
      "Desarrollar habilidades de liderazgo",
    ],
    interests: [
      "Inteligencia Artificial",
      "Desarrollo de aplicaciones móviles",
    ],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student2 = {
  profile: {
    name: "Maria Sanchez",
    username: "mariasanchez",
    email: "maria.sanchez@example.com",
    password: "password456",
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
    goals: [
      "Obtener un puesto de Recursos Humanos en una empresa multinacional",
      "Realizar un posgrado en Psicología Organizacional",
    ],
    interests: ["Desarrollo profesional", "Coaching"],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student3 = {
  profile: {
    name: "John Smith",
    username: "johnsmith",
    email: "john.smith@example.com",
    password: "password789",
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
    goals: [
      "Obtener una maestría en Psicología Clínica",
      "Abrir mi propia consulta",
    ],
    interests: [
      "Investigación en neurociencia",
      "Tratamiento de trastornos de ansiedad",
    ],
    languages: ["Inglés", "Español"],
    availability: "Part-time",
    contract: "Remoto",
  },
};

const student4 = {
  profile: {
    name: "Laura Johnson",
    username: "laurajohnson",
    email: "laura.johnson@example.com",
    password: "qwerty123",
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
    goals: ["Especializarme en derecho laboral"],
    interests: ["Derecho laboral"],
    languages: ["Español"],
    availability: "Part-Time",
    contract: "Remoto",
  },
};

const student5 = {
  profile: {
    name: "Carlos Fernández",
    username: "carlosfernandez",
    email: "carlos.fernandez@example.com",
    password: "contraseña456",
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
      "Trabajar en un bufete reconocido internacionalmente",
      "Especializarme en derecho corporativo",
    ],
    interests: ["Derecho internacional", "Propiedad intelectual"],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student6 = {
  profile: {
    name: "Juan Gomez",
    username: "juan",
    email: "juan@email.com",
    password: "1234",
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
    career: "Perito mercantil",
    skills: ["Contabilidad", "Gestión"],
    goals: ["Dinero", "Abundancia"],
    interests: ["Crecimiento personal", "Poder"],
    languages: ["Inglés", "Español"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const student7 = {
  profile: {
    name: "Jonathan Leroy",
    username: "jonathan",
    email: "jona@example.com",
    password: "qwerty",
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
    interests: ["Mercado de valores", "Inversiones sostenibles"],
    goals: ["Obtener la certificación CFA"],
    languages: ["Español"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const professional1 = {
  profile: {
    name: "Ana Rodriguez",
    username: "anarodriguez",
    email: "ana.rodriguez@example.com",
    password: "password123",
    city: "Madrid",
    country: "España",
    support: true,
  },
  academic: {
    type: "Senior",
    institution: "Universidad Autónoma de Madrid",
    level: "Avanzado",
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
      "Liderar una campaña de marketing a nivel internacional",
      "Mentorizar a jóvenes profesionales en el campo del marketing",
    ],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
};

const professional2 = {
  profile: {
    name: "Michael Brown",
    username: "michaelbrown",
    email: "michael.brown@example.com",
    password: "password456",
    city: "New York",
    country: "United States",
    support: false,
  },
  academic: {
    type: "Middle",
    institution: "Stanford University",
    level: "Avanzado",
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
    goals: [
      "Liderar el desarrollo de un producto innovador",
      "Contribuir a proyectos de código abierto",
    ],
    languages: ["Inglés"],
    availability: "Full-time",
    contract: "Híbrido",
  },
};

const professional3 = {
  profile: {
    name: "Sophie Martin",
    username: "sophiemartin",
    email: "sophie.martin@example.com",
    password: "qwerty123",
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
    goals: [
      "Obtener una certificación en coaching",
      "Contribuir a la mejora de la experiencia del empleado",
    ],
    languages: ["Francés", "Inglés"],
    availability: "Full-time",
    contract: "Híbrido",
  },
};

const professional4 = {
  profile: {
    name: "David Lee",
    username: "davidlee",
    email: "david.lee@example.com",
    password: "password789",
    city: "San Francisco",
    country: "United States",
    support: true,
  },
  academic: {
    type: "Sin Experiencia",
    institution: "University of California, Berkeley",
    level: "Avanzado",
    area: ["Finanzas"],
    graduation: "2000",
  },
  info: {
    company_name: "XYZ Investment Bank",
    position: "Analista Financiero",
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
      "Obtener la certificación CFA",
      "Especializarme en inversiones de impacto",
    ],
    languages: ["Inglés"],
    availability: "Full-time",
    contract: "Presencial",
  },
};

const professional5 = {
  profile: {
    name: "Maria Garcia",
    username: "mariagarcia",
    email: "maria.garcia@example.com",
    password: "contraseña456",
    city: "Madrid",
    country: "España",
    support: false,
  },
  academic: {
    type: "Senior",
    institution: "IE Business School",
    level: "Avanzado",
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
      "Asesorar a empresas en su proceso de transformación digital",
      "Ser reconocida como referente en consultoría estratégica",
    ],
    languages: ["Español", "Inglés"],
    availability: "Full-time",
    contract: "Remoto",
  },
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

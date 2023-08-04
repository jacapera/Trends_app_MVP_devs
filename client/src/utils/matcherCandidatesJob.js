<<<<<<< HEAD
import axios from 'axios';

const student =[
    {
        type: "student",
        name: "Juan Perez",
        username: "juanperez",
        birth: "2001-10-08",
        email: "juan.perez@example.com",
        profile_bio:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
          "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Buenos Aires",
        profile_country: "Argentina",
        profile_support: true,
        info_career: ["Desarrollo de Software"],        
      },
      {
        type: "student",
        name: "Maria Sanchez",
        username: "mariasanchez",
        birth: "2001-10-08",
        email: "maria.sanchez@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Madrid",
        profile_country: "España",
        profile_support: false,
        info_career: ["Recursos Humanos"],
      },
      {
        type: "student",
        name: "John Smith",
        username: "johnsmith",
        birth: "2001-10-08",
        email: "john.smith@example.com",
        profile_bio:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "New York",
        profile_country: "United States",
        profile_support: true,
        info_career: ["Psicoterapia"],
      },
      {
        type: "student",
        name: "Laura Johnson",
        username: "laurajohnson",
        birth: "2001-10-08",
        email: "laura.johnson@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "London",
        profile_country: "United Kingdom",
        profile_support: false,
        info_career: ["Abogacía"],
      },
      {
        type: "student",
        name: "Carlos Fernández",
        username: "carlosfernandez",
        birth: "2001-10-08",
        email: "carlos.fernandez@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Mexico City",
        profile_country: "Mexico",
        profile_support: true,
        info_career: ["Abogacía"],
      },
      {
        type: "professional",
        name: "Ana Rodriguez",
        username: "anarodriguez",
        birth: "2001-10-08",
        email: "ana.rodriguez@example.com",
        profile_bio:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
          "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        profile_city: "Madrid",
        profile_country: "España",
        profile_support: true,
        info_career: [
            "Desarrollo e implementación de estrategias de marketing",
            "Gestión de equipos y proyectos",
            "Incremento de la visibilidad de la marca",
          ]
      },
      {
        type: "professional",
        name: "Michael Brown",
        username: "michaelbrown",
        birth: "2001-10-08",
        email: "michael.brown@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        profile_city: "New York",
        profile_country: "United States",
        profile_support: false,
        info_career: [
            "Desarrollo de aplicaciones web y móviles",
            "Colaboración en equipos de desarrollo ágiles",
            "Optimización de rendimiento de software",
          ],
      },
      {
        type: "professional",
        name: "Sophie Martin",
        username: "sophiemartin",
        birth: "2001-10-08",
        email: "sophie.martin@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        profile_city: "Paris",
        profile_country: "France",
        profile_support: true,
        info_career: [
            "Evaluación y selección de personal",
            "Desarrollo de planes de capacitación",
            "Gestión del clima laboral",
          ],
      }
];

export const matcherCandidatesJob = async(dataJob) => {
    console.log("que trae dataJobs: ", dataJob)
    //?SOLO PARA USO DE PRUEBAS, CUANDO LAS RUTAS ESTEN SE GUARDAN
    let candidates = [];

    //!Armo las condiciones para consultar los estudiantes con campos clave
    let strStudentHigh='';
    // >>/search/users?type=student&info_skills=Desarrollo web,Bases de datos    
    if(dataJob.levelRequired) strStudentHigh += '&academic_level='+dataJob.levelRequired;
    //if(dataJob.studyArea) strStudentHigh+='&academic_area='+dataJob.studyArea;
    //if(dataJob.benefits) strStudentHigh+='&info_interests='+dataJob.benefits.join(',');
    //if(dataJob.skillsRequired) strStudentHigh+='&info_skills='+dataJob.skillsRequired.join(',');
    //if(dataJob.jobGoal) strStudentHigh+='&info_goals='+dataJob.jobGoal.join(',');
    //console.log("que tiene level_required: ", dataJob.academic.level_required);
    
    let query = `http://localhost:3001/api/v1/search/users?type=student`;
    query += strStudentHigh;

    console.log("como arma query: ", query);

      try{
        const response = (await axios.get(query)).data;
        console.log("que trae response <matcherCandidatesJob>: ", response);

        response
          ?candidates = [...response]
          :candidates =[]

      }catch(error){
        console.log("error al traer datos de estudiantes <matcherCandidates>: ", error.message);
      }
    



    //!Armo las condiciones para consultar estudiantes con campos de media
    // let strStudentLow='';
    // if(dataJob.info.availability) strStudentLow += '&availability='+dataJob.info.availability;
    // if(dataJob.info.languages_required) strStudentLow += '&languages='+dataJob.info.languages_required;
    // if(dataJob.info.job_description) strStudentLow += '&interests='+dataJob.info.job_description;
    // //if(dataJob.info.job_description) strStudentLow += '&city='+dataJob.info.job_description;
    // console.log("condiciones estudiantes media: ", strStudentLow);

    return candidates;
    
};
=======
const student =[
    {
        type: "student",
        name: "Juan Perez",
        username: "juanperez",
        birth: "2001-10-08",
        email: "juan.perez@example.com",
        profile_bio:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
          "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Buenos Aires",
        profile_country: "Argentina",
        profile_support: true,
        info_career: ["Desarrollo de Software"],        
      },
      {
        type: "student",
        name: "Maria Sanchez",
        username: "mariasanchez",
        birth: "2001-10-08",
        email: "maria.sanchez@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Madrid",
        profile_country: "España",
        profile_support: false,
        info_career: ["Recursos Humanos"],
      },
      {
        type: "student",
        name: "John Smith",
        username: "johnsmith",
        birth: "2001-10-08",
        email: "john.smith@example.com",
        profile_bio:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "New York",
        profile_country: "United States",
        profile_support: true,
        info_career: ["Psicoterapia"],
      },
      {
        type: "student",
        name: "Laura Johnson",
        username: "laurajohnson",
        birth: "2001-10-08",
        email: "laura.johnson@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "London",
        profile_country: "United Kingdom",
        profile_support: false,
        info_career: ["Abogacía"],
      },
      {
        type: "student",
        name: "Carlos Fernández",
        username: "carlosfernandez",
        birth: "2001-10-08",
        email: "carlos.fernandez@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Mexico City",
        profile_country: "Mexico",
        profile_support: true,
        info_career: ["Abogacía"],
      },
      {
        type: "professional",
        name: "Ana Rodriguez",
        username: "anarodriguez",
        birth: "2001-10-08",
        email: "ana.rodriguez@example.com",
        profile_bio:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
          "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        profile_city: "Madrid",
        profile_country: "España",
        profile_support: true,
        info_career: [
            "Desarrollo e implementación de estrategias de marketing",
            "Gestión de equipos y proyectos",
            "Incremento de la visibilidad de la marca",
          ]
      },
      {
        type: "professional",
        name: "Michael Brown",
        username: "michaelbrown",
        birth: "2001-10-08",
        email: "michael.brown@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        profile_city: "New York",
        profile_country: "United States",
        profile_support: false,
        info_career: [
            "Desarrollo de aplicaciones web y móviles",
            "Colaboración en equipos de desarrollo ágiles",
            "Optimización de rendimiento de software",
          ],
      },
      {
        type: "professional",
        name: "Sophie Martin",
        username: "sophiemartin",
        birth: "2001-10-08",
        email: "sophie.martin@example.com",
        profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
        profile_image:
            "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        profile_city: "Paris",
        profile_country: "France",
        profile_support: true,
        info_career: [
            "Evaluación y selección de personal",
            "Desarrollo de planes de capacitación",
            "Gestión del clima laboral",
          ],
      }
];

export const matcherCandidatesJob = (dataJob) => {
    console.log("que trae dataJobs: ", dataJob)
    //?SOLO PARA USO DE PRUEBAS, CUANDO LAS RUTAS ESTEN SE GUARDAN
    let candidates = [...student];

    //!Armo las condiciones para consultar los estudiantes con campos clave
    let strStudentHigh='';
    // >>/search/users?type=student&info_skills=Desarrollo web,Bases de datos    
    if(dataJob.academic.level_required) strStudentHigh += '&level='+dataJob.academic.level_required;
    if(dataJob.academic.study_area) strStudentHigh+='&area='+dataJob.academic.study_area;
    if(dataJob.info.benefits) strStudentHigh+='&interests='+dataJob.info.benefits.join(',');
    if(dataJob.info.skills_required) strStudentHigh+='&skills='+dataJob.info.skills_required.join(',');
    if(dataJob.info.job_goal) strStudentHigh+='&goals='+dataJob.info.job_goal.join(',');
    //console.log("que tiene level_required: ", dataJob.academic.level_required);
    console.log("condiciones estudiantes Alta: ", strStudentHigh);

    //!Armo las condiciones para consultar estudiantes con campos de media
    let strStudentLow='';
    if(dataJob.info.availability) strStudentLow += '&availability='+dataJob.info.availability;
    if(dataJob.info.languages_required) strStudentLow += '&languages='+dataJob.info.languages_required;
    if(dataJob.info.job_description) strStudentLow += '&interests='+dataJob.info.job_description;
    //if(dataJob.info.job_description) strStudentLow += '&city='+dataJob.info.job_description;
    console.log("condiciones estudiantes media: ", strStudentLow);

    return candidates;
};
>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558

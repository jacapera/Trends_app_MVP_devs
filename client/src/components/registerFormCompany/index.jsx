<<<<<<< HEAD
import RegisterFormBase from "../RegisterFormBase/RegisterFormBase";



export default function CompanyRegisterForm () {
  return (
    <RegisterFormBase/>
  )
}



// import { useEffect, useState } from "react";
// import Validation from "../../utils/validateFormCompany";
// import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi";
// import { Button, Icon } from "@tremor/react";
// // import { Icon, Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";
// import formatRegisterCompany from "../../utils/formatRegisterCompany";
// import CompanyRegisterContact from "./contactRegisterForm";
// import {
//   validateContact,
//   errorContact,
// } from "../../utils/validateCompany";

// const REGEX_PASSWORD =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?& ]{8,}$/;

// export default function CompanyRegisterForm() {
//   const [isContactComplete, setIsContactComplete] = useState(false);

//   // const[data, setData] = useState(null);

//   const [formCompany, setFormCompany] = useState({
//     company_name: "",
//     cuit: "",
//     email: "",
//     city: "",
//     country: "",
//     website: "",
//     usuario: "",
//     password: "",

//   });

//   const [error, setError] = useState({});

//   const handleChangeForm = (event) => {
//     const { name, value } = event.target;
//     setFormCompany({
//       ...formCompany,
//       [name]: value,
//     });
//     setError(
//       Validation({
//         ...formCompany,
//         [name]: value,
//       })
//     );
//     restrict(
//       {
//         ...formCompany,
//         [name]: value,
//       },
//       name,
//       value
//     );
//   };

//   const restrict = (form, name, value) => {
//     //cuit solo numeros
//     if (name === "cuit") {
//       const inputValue = value;
//       const cuitNumber = inputValue.replace(/\D/g, "");
//       setFormCompany({
//         ...formCompany,
//         cuit: cuitNumber,
//       });
//     }

//     //usuario sin espacios
//     if (name === "usuario") {
//       const inputValue = value;
//       const user = inputValue.replace(" ", "");
//       setFormCompany({
//         ...formCompany,
//         usuario: user,
//       });
//     }

//     //password sin espacios
//     if (name === "password") {
//       const inputValue = value;
//       const pass = inputValue.replace(" ", "");
//       setFormCompany({
//         ...formCompany,
//         password: pass,
//       });
//     }

//     //experiencia >1 y <100
//     if (name === "experience_required") {
//       if (Number(value) < 1) {
//         setFormCompany({
//           ...formCompany,
//           experience_required: 1,
//         });
//       }
//       if (Number(value) > 100) {
//         setFormCompany({
//           ...formCompany,
//           experience_required: 100,
//         });
//       }
//     }
//   };

//   const handleChangeSelect = (prop, value) => {
//     //console.log("que trae value: ", value)
//     setFormCompany({ ...formCompany, [prop]: value });
//   };

//   //presiono boton submit
//   const submitHandler = (event) => {
//     event.preventDefault();
//     console.log("que tiene formCompany antes de enviar: ", formCompany);
//     //formateo datos a enviar objeto.
//     const companyFormated = formatRegisterCompany(formCompany);
//     console.log("como trae formatRegisterCompany: ", companyFormated);
//   };

//   useEffect(
//     () => {
//       console.log("que tiene formCompany: ", formCompany);
//       console.log("que tiene error: ", error);
//       //console.log("que tiene data: ", data);

//       //validacion de contacto y error contacto
//       setIsContactComplete(validateContact(formCompany) && errorContact(error));
//       console.log("que trae isContactComplete: ", isContactComplete);

//     },
//     [formCompany],
//     [error]
//   );

//   return (
//     <div>
//       <h1>Registo de Empresas</h1>
//       <form onSubmit={submitHandler}>
//         {/* INFORMACION CONTACTO */}
//         <div>
//           <CompanyRegisterContact
//             formCompany={formCompany}
//             error={error}
//             handleChangeSelect={handleChangeSelect}
//             handleChangeForm={handleChangeForm}
//           />
//         </div>

//         <div>
//           <Button
//             disabled={
//                !(isContactComplete)
//             }
//             type="submit"
//             style={{ margin: 10, padding: 10 }}
//           >
//             Guardar Registro
//           </Button>
//         </div>
//       </form>
//       <br />

//       <div>
//         {isContactComplete ? (
//           <Icon size="lg" color="green" icon={HiOutlineCheckCircle} />
//         ) : (
//           <Icon size="lg" color="red" icon={HiOutlineMinusCircle} />
//         )}

//       </div>
//     </div>
//   );
// }
=======
import RegisterFormBase from "../RegisterFormBase/RegisterFormBase";



export default function CompanyRegisterForm () {
  return (
    <RegisterFormBase/>
  )
}



// import { useEffect, useState } from "react";
// import Validation from "../../utils/validateFormCompany";
// import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi";
// import { Button, Icon } from "@tremor/react";
// // import { Icon, Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";
// import formatRegisterCompany from "../../utils/formatRegisterCompany";
// import CompanyRegisterContact from "./contactRegisterForm";
// import {
//   validateContact,
//   errorContact,
// } from "../../utils/validateCompany";

// const REGEX_PASSWORD =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?& ]{8,}$/;

// export default function CompanyRegisterForm() {
//   const [isContactComplete, setIsContactComplete] = useState(false);

//   // const[data, setData] = useState(null);

//   const [formCompany, setFormCompany] = useState({
//     company_name: "",
//     cuit: "",
//     email: "",
//     city: "",
//     country: "",
//     website: "",
//     usuario: "",
//     password: "",

//   });

//   const [error, setError] = useState({});

//   const handleChangeForm = (event) => {
//     const { name, value } = event.target;
//     setFormCompany({
//       ...formCompany,
//       [name]: value,
//     });
//     setError(
//       Validation({
//         ...formCompany,
//         [name]: value,
//       })
//     );
//     restrict(
//       {
//         ...formCompany,
//         [name]: value,
//       },
//       name,
//       value
//     );
//   };

//   const restrict = (form, name, value) => {
//     //cuit solo numeros
//     if (name === "cuit") {
//       const inputValue = value;
//       const cuitNumber = inputValue.replace(/\D/g, "");
//       setFormCompany({
//         ...formCompany,
//         cuit: cuitNumber,
//       });
//     }

//     //usuario sin espacios
//     if (name === "usuario") {
//       const inputValue = value;
//       const user = inputValue.replace(" ", "");
//       setFormCompany({
//         ...formCompany,
//         usuario: user,
//       });
//     }

//     //password sin espacios
//     if (name === "password") {
//       const inputValue = value;
//       const pass = inputValue.replace(" ", "");
//       setFormCompany({
//         ...formCompany,
//         password: pass,
//       });
//     }

//     //experiencia >1 y <100
//     if (name === "experience_required") {
//       if (Number(value) < 1) {
//         setFormCompany({
//           ...formCompany,
//           experience_required: 1,
//         });
//       }
//       if (Number(value) > 100) {
//         setFormCompany({
//           ...formCompany,
//           experience_required: 100,
//         });
//       }
//     }
//   };

//   const handleChangeSelect = (prop, value) => {
//     //console.log("que trae value: ", value)
//     setFormCompany({ ...formCompany, [prop]: value });
//   };

//   //presiono boton submit
//   const submitHandler = (event) => {
//     event.preventDefault();
//     console.log("que tiene formCompany antes de enviar: ", formCompany);
//     //formateo datos a enviar objeto.
//     const companyFormated = formatRegisterCompany(formCompany);
//     console.log("como trae formatRegisterCompany: ", companyFormated);
//   };

//   useEffect(
//     () => {
//       console.log("que tiene formCompany: ", formCompany);
//       console.log("que tiene error: ", error);
//       //console.log("que tiene data: ", data);

//       //validacion de contacto y error contacto
//       setIsContactComplete(validateContact(formCompany) && errorContact(error));
//       console.log("que trae isContactComplete: ", isContactComplete);

//     },
//     [formCompany],
//     [error]
//   );

//   return (
//     <div>
//       <h1>Registo de Empresas</h1>
//       <form onSubmit={submitHandler}>
//         {/* INFORMACION CONTACTO */}
//         <div>
//           <CompanyRegisterContact
//             formCompany={formCompany}
//             error={error}
//             handleChangeSelect={handleChangeSelect}
//             handleChangeForm={handleChangeForm}
//           />
//         </div>

//         <div>
//           <Button
//             disabled={
//                !(isContactComplete)
//             }
//             type="submit"
//             style={{ margin: 10, padding: 10 }}
//           >
//             Guardar Registro
//           </Button>
//         </div>
//       </form>
//       <br />

//       <div>
//         {isContactComplete ? (
//           <Icon size="lg" color="green" icon={HiOutlineCheckCircle} />
//         ) : (
//           <Icon size="lg" color="red" icon={HiOutlineMinusCircle} />
//         )}

//       </div>
//     </div>
//   );
// }
>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558

import { useEffect, useState } from "react";
import { Button } from "@tremor/react";
import { Icon } from "@tremor/react";
import { HiOutlineCheckCircle, HiOutlineMinusCircle } from "react-icons/hi";
// import { Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";
import StudentRegisterExtra from "./extraRegisterForm";
import StudentRegisterContact from "./contactRegisterForm";
import StudentRegisterAcademic from "./academicRegisterForm";
import StudentRegisterInterest from "./interestRegisterForm";
import formatRegisterStudent from "../../utils/formatRegisterStudent";
import {
  validateContact,
  errorContact,
  validateAcademic,
  errorAcademic,
  validateInterest,
  errorInterest,
  validateExtra,
  errorExtra,
} from "../../utils/validateStudent";
import "./Register.css"

export default function StudentRegisterForm() {
  const [isContactComplete, setIsContactComplete] = useState(false);
  const [isAcademicComplete, setIsAcademicComplete] = useState(false);
  const [isInterestComplete, setIsInterestComplete] = useState(false);
  const [isExtraComplete, setIsExtraComplete] = useState(false);

  //?ESTADOS LOCALES
  const [profile, setProfile] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    gender: "",
    city: "",
    country: "",
    username: "",
    password: "",
    professional_support: false, //si / no
    //academico
    type_student: "", //Secundaria - Universitario Junior - Universitario intermedio - Universitario Avanzado
    level: "",
    institution: "",
    study_area: "",
    planned_graduation: "",
    //intereses
    career_interest: "",
    skills: "",
    interests: "",
    languages: "",
    availability: "",
    contract: "",
    //Extra
    goals: "", //desplegar lista
    other_goals: "", // se agrega al array de goals
    problematic: "", //problematica
    other_problematic: "", //se agrega al array de problematica
  });

  const [error, setError] = useState({});

  const [page, setPage] = useState({
    button1: "Prev",
    button1_hide: true,
    button2: "Continue",
    button2_hide: false,
    div_contact: false,
    div_academico: true,
    div_interest: true,
    div_extra: true,
  });

  //?MANEJA NAVEGACION Y BOTONES
  const handlePage = (event) => {
    console.log("presiona boton");
    if (!page.div_contact) {
      //SI estamos en PAGINA CONTACTO
      console.log("entra a div_contact");
      setPage({
        button1: "Prev",
        button1_hide: false,
        button2: "Continue",
        button2_hide: false,
        div_contact: true,
        div_academico: false, //muestra academico
        div_interest: true,
        div_extra: true,
      });
    } else if (!page.div_academico) {
      //SI estamos en PAGINA ACADEMICO
      console.log("entra a div_academico");
      if (event.target.name == "prev") {
        //si presiono prev -> voy a contacto
        setPage({
          button1: "Prev",
          button1_hide: true,
          button2: "Continue",
          button2_hide: false,
          div_contact: false, //muestra contacto
          div_academico: true,
          div_interest: true,
          div_extra: true,
        });
      }
      if (event.target.name === "continue") {
        //si presiono continue -> voy a interest
        setPage({
          button1: "Prev",
          button1_hide: false,
          button2: "Continue",
          button2_hide: false,
          div_contact: true,
          div_academico: true,
          div_interest: false, //muestra interest
          div_extra: true,
        });
      }
      //
    } else if (!page.div_interest) {
      //SI estamos en PAGINA INTEREST
      console.log("entra a div_interest");
      //
      if (event.target.name == "prev") {
        //si presiono prev -> voy a academico
        setPage({
          button1: "Prev",
          button1_hide: false,
          button2: "Continue",
          button2_hide: false,
          div_contact: true,
          div_academico: false, //muestra contacto
          div_interest: true,
          div_extra: true,
        });
      }
      if (event.target.name === "continue") {
        //si presiono continue -> voy a extra
        setPage({
          button1: "Prev",
          button1_hide: false,
          button2: "Continue",
          button2_hide: true,
          div_contact: true,
          div_academico: true,
          div_interest: true,
          div_extra: false, //muestra interest
        });
      }
    } else if (!page.div_extra) {
      //Si estamos en PAGINA INFO EXTRA
      console.log("entra a div_extra");
      //
      setPage({
        button1: "Prev",
        button1_hide: false,
        button2: "Continue",
        button2_hide: false,
        div_contact: true,
        div_academico: true,
        div_interest: false, //muestra interest
        div_extra: true,
      });
    }
  };

  //?SI INGRESA ALGUN VALOR POR INPUT
  const handleChangeProfile = (event) => {
    console.log("que viene en event: ", event);
    const { name, value, checked } = event.target;
    if (name === "professional_support") {
      //console.log("como esta checked: ", checked)
      setProfile({
        ...profile,
        [name]: checked,
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
      validate(
        {
          ...profile,
          [name]: value,
        },
        name,
        value
      );
    }
  };

  //?SI SE SELECCIONA UN VALOR EN SELECT
  const handleChangeSelect = (prop, value) => {
    //console.log("que trae value: ", value)
    setProfile({ ...profile, [prop]: value });
  };

  //?VALIDACIONES
  const validate = (profile, name, value) => {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (name === "name") {
      if (/[0-9]/.test(profile.name)) {
        setError({
          ...error,
          name: "Error: el Nombre no puede contener numeros",
        });
      } else setError({ ...error, name: "" });
    }

    if (name === "lastname") {
      if (/[0-9]/.test(profile.lastname)) {
        setError({
          ...error,
          lastname: "Error: el Apellido no puede contener numeros",
        });
      } else setError({ ...error, lastname: "" });
    }

    if (name === "dni") {
      const inputValue = value;
      const dniNumber = inputValue.replace(/\D/g, "");
      setProfile({
        ...profile,
        dni: dniNumber,
      });
    }

    if (name === "email") {
      if (!regexEmail.test(profile.email)) {
        error.email = "Debe ingresar un mail valido";
      } else {
        setError({ ...error, email: "" });
      }
      if (value === "") setError({ ...error, email: "" });
    }

    if (name === "username") {
      const inputValue = value;
      const user = inputValue.replace(" ", "");
      setProfile({
        ...profile,
        username: user,
      });
    }

    if (name === "password") {
      const inputValue = value;
      const pass = inputValue.replace(" ", "");
      setProfile({
        ...profile,
        password: pass,
      });
    }

    //valida que sea un año correcto
    if (name === "planned_graduation") {
      console.log("ingrea a planned_graduation, value", value);
      if (value < 1900 || value > 2999) {
        setError({ ...error, planned_graduation: "Ingrese un año valido" });
      } else {
        setError({ ...error, planned_graduation: "" });
      }
    }
  };

  //?valida que todos los campos esten cargados y no existan errores
  const validateComplete = () => {
    for (let propiedad in profile) {
      if (
        propiedad !== "other_goals" &&
        propiedad !== "other_problematic" &&
        propiedad !== "problematic"
      ) {
        if (profile[propiedad] === "" || profile[propiedad].length === 0)
          return false;
      }
    }
    for (let propiedad in error) {
      if (error[propiedad] !== "") return false;
    }
    return true;
  };

  //?PRESIONO BOTON SUBMIT
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("que tiene profile antes de enviar: ", profile);
    //formateo datos a enviar objeto.
    const studentFormated = formatRegisterStudent(profile);
    console.log("como trae formatRegisterStudent: ", studentFormated);
  };

  useEffect(
    () => {
      console.log("que tiene profile: ", profile);
      console.log("que tiene error: ", error);

      //validacion contacto
      setIsContactComplete(validateContact(profile) && errorContact(error));

      //validacion academic
      setIsAcademicComplete(validateAcademic(profile) && errorAcademic(error));

      //validacion intereses
      setIsInterestComplete(validateInterest(profile) && errorInterest(error));

      //validacion info extra
      setIsExtraComplete(validateExtra(profile) && errorExtra(error));
    },
    [profile],
    [error]
  );

  return (
    <div>
      <h1>Registro Estudiante</h1>
      <form onSubmit={submitHandler}>
        {/* PERFIL */}
        <div hidden={page.div_contact}>
          <StudentRegisterContact
            profile={profile}
            error={error}
            handleChangeSelect={handleChangeSelect}
            handleChangeProfile={handleChangeProfile}
          />
        </div>

        {/* INFORMACION ACADEMICA */}
        <div hidden={page.div_academico}>
          <StudentRegisterAcademic
            profile={profile}
            error={error}
            handleChangeSelect={handleChangeSelect}
            handleChangeProfile={handleChangeProfile}
          />
        </div>

        {/* INTERESES */}
        <div hidden={page.div_interest}>
          <StudentRegisterInterest
            profile={profile}
            error={error}
            handleChangeSelect={handleChangeSelect}
            handleChangeProfile={handleChangeProfile}
          />
        </div>

        {/* INFORMACION EXTRA */}
        <div hidden={page.div_extra}>
          <StudentRegisterExtra
            profile={profile}
            handleChangeSelect={handleChangeSelect}
            handleChangeProfile={handleChangeProfile}
          />
        </div>
        <div>
          <Button
            disabled={
              !(
                isContactComplete &&
                isAcademicComplete &&
                isInterestComplete &&
                isExtraComplete
              )
            }
            type="submit"
            style={{ margin: 10, padding: 10 }}
          >
            Guardar Registro
          </Button>
        </div>
      </form>
      <br />
      <div>
        <button
          name="prev"
          hidden={page.button1_hide}
          onClick={handlePage}
          style={{ margin: 10, padding: 10 }}
        >
          {page.button1}
        </button>
        <button
          name="continue"
          hidden={page.button2_hide}
          onClick={handlePage}
          style={{ margin: 10, padding: 10 }}
        >
          {page.button2}
        </button>
      </div>
      <div>
        {/* <label>progreso: </label>
				<progress id="profile" max="100" value={progress}>{progress}</progress> */}
        {isContactComplete ? (
          <Icon size="lg" color="green" icon={HiOutlineCheckCircle} />
        ) : (
          <Icon size="lg" color="red" icon={HiOutlineMinusCircle} />
        )}
        {isAcademicComplete ? (
          <Icon size="lg" color="green" icon={HiOutlineCheckCircle} />
        ) : (
          <Icon size="lg" color="red" icon={HiOutlineMinusCircle} />
        )}
        {isInterestComplete ? (
          <Icon size="lg" color="green" icon={HiOutlineCheckCircle} />
        ) : (
          <Icon size="lg" color="red" icon={HiOutlineMinusCircle} />
        )}
        {isExtraComplete ? (
          <Icon size="lg" color="green" icon={HiOutlineCheckCircle} />
        ) : (
          <Icon size="lg" color="red" icon={HiOutlineMinusCircle} />
        )}
      </div>
    </div>
  );
}

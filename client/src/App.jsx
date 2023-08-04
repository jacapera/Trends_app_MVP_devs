<<<<<<< HEAD
import "./App.css";
import StudentRegister from "./components/registerFormStudent";
import { Route, Routes ,Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import CompanyRegister from "./components/registerFormCompany";
import ProfessionalRegisterForm from "./components/registerFormProfesional";
import "./App.css";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  Profile,
  FeedCompany,
  Chat,
} from "./views/";
import {NavBar} from "./components"
// Para pruebas del chat despues las podemos remover
// --------------------------------------------------
import Register from "./views/Chat/Register/Register";
import Login from "./views/Chat/Login";
import NavBarInicio from "../src/components/NavBarInicio/NavBarInicio";
import RegisterFormBase from "./components/RegisterFormBase/RegisterFormBase";


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/Trends_app_MVP";
  return (
    <>
    {isLandingPage && <NavBarInicio />}
      <Routes>
        <Route exact path="/Trends_app_MVP" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route exact path='/Trends_app_MVP/studentRegister' element={<RegisterFormBase type = "student"/>} />
        <Route exact path='/Trends_app_MVP/professionalRegister' element={<RegisterFormBase type = "professional" />} />
        <Route exact path='/Trends_app_MVP/companyRegister' element={<RegisterFormBase type = "company" />} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />
        <Route path="/Trends_app_MVP/feedCompany" element={<FeedCompany />} />

        {/* RUTAS HIJAS PARA PRUEBAS DEL CHAT DESPUES LAS PODEMOS REMOVER */}
        <Route path="/Trends_app_MVP/chat" element={<Chat />}>
          <Route path='register-chat' element={ <Register />} />
          <Route path='login-chat' element={ <Login />} />
        </Route>

        {/*RUTA PRUEBA DE NAVBAR Y SEARCHBAR*/}
        <Route path="/Trends_app_MVP/navbar" element={<NavBar/>}/>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}



export default App;
=======
import "./App.css";
import StudentRegister from "./components/registerFormStudent";
import { Route, Routes ,Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
import CompanyRegister from "./components/registerFormCompany";
import ProfessionalRegisterForm from "./components/registerFormProfesional";
import "./App.css";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  Profile,
  FeedCompany,
  Chat,
} from "./views/";
import {NavBar} from "./components"
// Para pruebas del chat despues las podemos remover
// --------------------------------------------------
import Register from "./views/Chat/Register/Register";
import Login from "./views/Chat/Login";
import NavBarInicio from "../src/components/NavBarInicio/NavBarInicio";
import RegisterFormBase from "./components/RegisterFormBase/RegisterFormBase";
import Chatx from "./views/Chat/Chat";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUserChat } from "./Redux/usersChatSlice";



function App() {
//!-----------------------------
  // const dispatch = useDispatch()
  // const loggedUserJSON = window.localStorage.getItem('loggedChatUser')
  // useEffect(() => {
  //   if (loggedUserJSON){
  //     const user = JSON.parse(loggedUserJSON);
  //     dispatch(setToken(user.token))
  //     dispatch(setUserChat({
  //       user_id:user?.foundedAccount?.id,
  //       username:user.foundedAccount?.username,
  //       image:user.foundedAccount?.profile_image,
  //     }));
  //   }
  // }, []);
//!----------------------------

  const location = useLocation();
  const isLandingPage = location.pathname === "/Trends_app_MVP";
  return (
    <>
    {isLandingPage && <NavBarInicio />}
      <Routes>
        <Route exact path="/Trends_app_MVP" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route exact path='/Trends_app_MVP/studentRegister' element={<RegisterFormBase type = "student"/>} />
        <Route exact path='/Trends_app_MVP/professionalRegister' element={<RegisterFormBase type = "professional" />} />
        <Route exact path='/Trends_app_MVP/companyRegister' element={<RegisterFormBase type = "company" />} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />
        <Route path="/Trends_app_MVP/feedCompany" element={<FeedCompany />} />
        <Route path="/Trends_app_MVP/chat2" element={<Chatx />}/>

        {/* RUTAS HIJAS PARA PRUEBAS DEL CHAT DESPUES LAS PODEMOS REMOVER */}
        <Route path="/Trends_app_MVP/chat" element={<Chat />}>
          <Route path='register-chat' element={ <Register />} />
          <Route path='login-chat' element={ <Login />} />
        </Route>

        {/*RUTA PRUEBA DE NAVBAR Y SEARCHBAR*/}
        <Route path="/Trends_app_MVP/navbar" element={<NavBar/>}/>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}

export default App;
>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558

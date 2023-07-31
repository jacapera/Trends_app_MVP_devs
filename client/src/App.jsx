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

// Para pruebas del chat despues las podemos remover
// --------------------------------------------------
import Register from "./views/Chat/Register/Register";
import Login from "./views/Chat/Login";
import NavBarInicio from "../src/components/NavBarInicio/NavBarInicio";


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/Trends_app_MVP";
  return (
    <>
    {isLandingPage && <NavBarInicio />}
      <Routes>
        <Route exact path="/Trends_app_MVP" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route exact path='/Trends_app_MVP/studentRegister' element={<StudentRegister/>} />
        <Route exact path='/Trends_app_MVP/professionalRegister' element={<ProfessionalRegisterForm/>} />
        <Route exact path='/Trends_app_MVP/companyRegister' element={<CompanyRegister/>} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />
        <Route path="/Trends_app_MVP/feedCompany" element={<FeedCompany />} />

        {/* RUTAS HIJAS PARA PRUEBAS DEL CHAT DESPUES LAS PODEMOS REMOVER */}
        <Route path="/Trends_app_MVP/chat" element={<Chat />}>
          <Route path='register-chat' element={ <Register />} />
          <Route path='login-chat' element={ <Login />} />
        </Route>


        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}



export default App;

import "./App.css";
import LandingPage from "./views/landingPage";
import RegisterPage from "./views/registerPage";
import LoginPage from "./views/loginPage";
import NotFoundPage from "./views/notFoundPage";
import Profile from "./views/Profile/Profile";
import StudentRegister from "./views/studentRegister/studentRegister";
import { Route, Routes, Link} from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar/NavBar"
import CompanyRegister from "./views/companyRegister/companyRegister";

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/Trends_app_MVP/" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/home" element={<Home/>}></Route>
        <Route exact path='/Trends_app_MVP/studentRegister' element={<StudentRegister/>} />
        <Route exact path='/Trends_app_MVP/companyRegister' element={<CompanyRegister/>} />
        <Route path='/Trends_app_MVP/profile' element={<Profile/>} />
        <Route path="/Trends_app_MVP/navBarTest" element={<NavBar/>} />
        {/*Ruta de prueba de NavBar*/}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
			
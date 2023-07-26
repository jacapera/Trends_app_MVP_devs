import "./App.css";
import StudentRegister from "./components/registerFormStudent";
import { Route, Routes ,Link} from "react-router-dom";
import CompanyRegister from "./components/registerFormCompany";
import "./App.css";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  Profile,
} from "./views/";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/Trends_app_MVP/" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route exact path='/Trends_app_MVP/studentRegister' element={<StudentRegister/>} />
        <Route exact path='/Trends_app_MVP/companyRegister' element={<CompanyRegister/>} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}



export default App;

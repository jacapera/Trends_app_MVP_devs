import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/landingPage";
import RegisterPage from "./views/registerPage";
import LoginPage from "./views/loginPage";
import NotFoundPage from "./views/notFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/Trends_app_MVP/" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

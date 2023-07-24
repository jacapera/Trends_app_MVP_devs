import { Route, Routes } from "react-router-dom";
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
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

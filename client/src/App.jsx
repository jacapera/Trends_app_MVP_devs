import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
  Profile,
  Chat,
} from "./views/";

// Para pruebas del chat despues las podemos remover
// --------------------------------------------------
import Register from "./views/Chat/Register/Register";
import Login from "./views/Chat/Login";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/Trends_app_MVP/" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />

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

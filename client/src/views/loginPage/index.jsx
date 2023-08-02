import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../../utils/authLogin";
import style from "./index.module.css";
import welcome from "../../assets/TestIcons/welcome.jpeg";
import axios from "axios";
const {VITE_URL} = import.meta.env;

export default function LoginPage() {
  const [validateLogin, setValidateLogin] = useState(null);
  const navigate = useNavigate();
  const URL = `${VITE_URL}/api/v1/auth/login`;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    if (inputs.email && inputs.password) {
      try {
        const fetch = await axios.post(URL, inputs);
        const result = fetch.data;
        console.log(result);
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  };

  // useEffect(() => {
  //   if(validateLogin) {
  //     navigate("/home")
  //   }
  // }, [validateLogin])

  return (
    <div className={style.BGContainer}>
      <div className={style.Card}>
        <div className={style.LeftContainer}>
          <div>
            <h1>Te damos la bienvenida</h1>
            <h3 className={style.MainText}>
              Al comenzar, vas a encontrar una lista de profesionales
              dispuestos a ayudarte y compartirte sus experiencias.
            </h3>
          </div>
          <img src={welcome} alt="" />
          <h3>Tambien tenemos convenios con empresas!</h3>
          <h3>
            Para que puedas navegar en muchas oportunidades laborales de
            tu nicho.
          </h3>
        </div>

        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div className={style.Input}>
              <input name="email" onChange={handleInputs} type="text" placeholder="Email" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>wrong email or password</p>
            </div>
            <div className={style.Input}>
              <input name="password" onChange={handleInputs} type="password" placeholder="Password" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>wrong email or password</p>
            </div>
            <div className={style.Options}>
              <div>
                <input id="remember" type="checkbox" />
                <label htmlFor="remember"> Remember me</label>
              </div>
              <div>forgot Password</div>
            </div>
            <button disabled={!(inputs.email && inputs.password)} type="submit">Sign In</button>
            <hr />
            <div className={style.Account}>
              <span>Doesn&apos;t have an account?</span> <span className={style.Bold}>Create Account</span>
            </div>
          </form>
        </div>
      </div>
    </div>


    // <main>
    //   <div className={style.BGContainer}>
    //     <div>

    //     </div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       placeholder={"example@mail.com"}
    //       label={"Email: "}
    //       name={"email"}
    //       type={"email"}
    //       value={inputs.email}
    //     />
    //     <input type="text" placeholder="Enter your password" />
    //     <div>
    //       <button disabled={!(inputs.email && inputs.password)} type="submit">Log In</button>
    //     </div>
    //   </form>
    //   </div>
    //       <button onClick={() => navigate("/Trends_app_MVP/")}>Back</button>
    //   {validateLogin === true &&
    //     <p>Login successful!</p>
    //   }
    //   {
    //     validateLogin === false &&
    //     <p>wrong email or password</p>
    //   }
    // </main>
  );
}
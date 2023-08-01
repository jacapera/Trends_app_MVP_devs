import { useState } from "react";
import style from "./RegisterFormBase.module.css";
import { useNavigate } from "react-router-dom";
import { validationRegister } from "../../utils/ValidationRegister";

const RegisterFormBase = ({type})  => {
    const [validateLogin, setValidateLogin] = useState(null);
    const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    type,
    email: "",
    password: "",
    name: "",
    username: ""
  });

  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.email && inputs.password && inputs.username && inputs.name && type) {
      const result = validationRegister(inputs.email)
      return result
  }}

    return(
        <div className={style.BGContainer}>
      <div className={style.Card}>
        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className={style.Input}>
              <input name="name" onChange={handleInputs} type="text" placeholder="Name" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>wrong email or password</p>
            </div>
            <div className={style.Input}>
              <input name="username" onChange={handleInputs} type="text" placeholder="Username" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>wrong email or password</p>
            </div>
            <div className={style.Input}>
              <input name="email" onChange={handleInputs} type="text" placeholder="Email" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>wrong email or password</p>
            </div>
            <div className={style.Input}>
              <input name="password" onChange={handleInputs} type="password" placeholder="Password" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>wrong email or password</p>
            </div>
            <button disabled={!(inputs.email && inputs.password && inputs.name && inputs.username)} type="submit">Register</button>
            <hr />
            <div className={style.Account}>
              <span>Already have an account?</span> <span className={style.Bold}>Log in</span>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default RegisterFormBase;
import { Button } from "@tremor/react";
import { CustomTextInput } from "../../components/customTextInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from '../../utils/authLogin';

export default function LoginPage() {
  const [validateLogin, setValidateLogin] = useState(null);
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email:"",
    password: ""
  })

  const handleInputs = (event) => {
    const {value, name} = event.target
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(inputs.email && inputs.password){
      const result = authLogin(inputs)
      setValidateLogin(result)
    }
  }

  // useEffect(() => {
  //   if(validateLogin) {
  //     navigate("/home")
  //   }
  // }, [validateLogin])
  
  return (
    <main>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <CustomTextInput
          placeholder={"example@mail.com"}
          label={"Email: "}
          name={"email"}
          type={"email"}
          handleInput={handleInputs}
          value={inputs.email}
        />
        <CustomTextInput
          placeholder={"Enter your password..."}
          label={"Password:"}
          name={"password"}
          type={"password"}
          handleInput={handleInputs}
          value={inputs.password}
        />
        <div>
          <Button disabled={!(inputs.email && inputs.password)} type="submit">Log In</Button>
        </div>
      </form>
          <Button variant="secondary" onClick={() => navigate("/Trends_app_MVP/")}>Back</Button>
      {validateLogin === true && 
        <p>Login successful!</p>
      }
      {
        validateLogin === false &&
        <p>wrong email or password</p>
      }
    </main>
  );
}

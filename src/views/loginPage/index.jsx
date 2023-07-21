import { Button } from "@tremor/react";
import { CustomTextInput } from "../../components/customTextInput";
import { useState } from "react";

export default function LoginPage() {
  const [validateLogin, setValidateLogin] = useState(false)
  
  return (
    <main>
      <h1>Log In</h1>
      <form >
        <CustomTextInput
          placeholder={"example@mail.com"}
          label={"Email: "}
          name={"email"}
          type={"text"}
        />
        <CustomTextInput
          placeholder={"Enter your password..."}
          label={"Password:"}
          name={"password"}
          type={"password"}
        />
        <Button variant="secondary">Back</Button>
        <Button type="submit">Log In</Button>
      </form>
      {validateLogin && 
        <p>this is the home page</p>
      }
    </main>
  );
}

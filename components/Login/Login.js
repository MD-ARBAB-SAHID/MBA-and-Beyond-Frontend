import { useCallback, useState, useContext } from "react";
import Link from "next/link";
import styles from "./Login.module.css";
import Input from "../Input/Input.js";
import useHttp from "../hooks/use-http";
import { useRouter } from "next/router";
import AuthContext from "../../store/Auth-Context";
import {
  emailValidator,
  loginPasswordValidator,
} from "../validators/validators";
import LoadingSpinner from "../UI/LoadingSpinner";
const Login = () => {
  const [isEmail, setEmail] = useState({ val: "", validity: false });
  const [isPassword, setPassword] = useState({ val: "", validity: false });
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);

  const router = useRouter();
  const setEmailHandler = useCallback((value, validity) => {
    setEmail({ val: value, validity: validity });
  }, []);
  const setPasswordHandler = useCallback((value, validity) => {
    setPassword({ val: value, validity: validity });
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formDetails = {
      email: isEmail.val,
      password: isPassword.val,
    };

    if (isEmail.validity && isPassword.validity) {
      clearError();
      try {
        const data = await sendRequest(
          "/api/login",
          "POST",
          JSON.stringify(formDetails),
          {
            "content-type": "application/json",
          }
        );
        if (data) {
          authCtx.login(true);
          router.replace({ pathname: "/my-blogs" });
        }
      } catch (err) {}
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={styles["container"]}>
        <form className={styles["login"]} onSubmit={formSubmitHandler}>
          <h2>Welcome, User!</h2>
          <p>Please log in</p>

          <Input
            placeholder="Email"
            type="email"
            errorText="Please Enter a valid Email"
            validator={emailValidator}
            isInput={isEmail}
            setInput={setEmailHandler}
          />
          <Input
            placeholder="Password"
            type="password"
            errorText="Please Enter Password"
            validator={loginPasswordValidator}
            isInput={isPassword}
            setInput={setPasswordHandler}
          />

          <input type="submit" value="Log In" />
          <div className={styles["errorClass"]}>
            {isError && !isLoading && <p>{isError}</p>}
          </div>
          <div className={styles["links"]}>
            <Link href="/sign-up">
              <a>Create An Account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

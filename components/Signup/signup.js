import { useCallback, useState, useContext } from "react";
import styles from "../Login/Login.module.css";
import Input from "../Input/Input.js";
import useHttp from "../hooks/use-http";
import { useRouter } from "next/router";
import AuthContext from "../../store/Auth-Context";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  confirmPasswordValidator,
} from "../validators/validators";
import LoadingSpinner from "../UI/LoadingSpinner";
const Signup = () => {
  const [isName, setName] = useState({ val: "", validity: false });
  const [isEmail, setEmail] = useState({ val: "", validity: false });
  const [isPassword, setPassword] = useState({ val: "", validity: false });
  const [isConfirmPassword, setConfirmPassword] = useState({
    val: "",
    validity: false,
  });
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);

  const router = useRouter();
  const setEmailHandler = useCallback((value, validity) => {
    setEmail({ val: value, validity: validity });
  }, []);
  const setPasswordHandler = useCallback((value, validity) => {
    setPassword({ val: value, validity: validity });
  }, []);
  const confirmPasswordHandler = useCallback((value, validity) => {
    setConfirmPassword({ val: value, validity: validity });
  }, []);
  const setNameHandler = useCallback((value, validity) => {
    setName({ val: value, validity: validity });
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formDetails = {
      name: isName.val,
      email: isEmail.val,
      password: isPassword.val,
      confirmPassword: isConfirmPassword.val,
    };

    if (
      isEmail.validity &&
      isName.validity &&
      isPassword.validity &&
      isConfirmPassword.validity &&
      isPassword.val === isConfirmPassword.val
    ) {
      clearError();
      try {
        const data = await sendRequest(
          "/api/sign-up",
          "POST",
          JSON.stringify(formDetails),
          {
            "content-type": "application/json",
          }
        );
        if (data) {
          authCtx.login(true);

          router.replace({ pathname: "/add-blog" });
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
          <p>Please Create An Account</p>
          <Input
            placeholder="Name"
            type="text"
            errorText="Please Enter a valid Name"
            validator={nameValidator}
            isInput={isName}
            setInput={setNameHandler}
          />

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
            errorText="Password must be minimum 6 length"
            validator={passwordValidator}
            isInput={isPassword}
            setInput={setPasswordHandler}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            errorText="Please Confirm Password"
            validator={passwordValidator}
            isInput={isConfirmPassword}
            setInput={confirmPasswordHandler}
          />

          <input type="submit" value="Sign Up" />
          <div className={styles["errorClass"]}>
            {isError && !isLoading && <p>{isError}</p>}
            {confirmPasswordValidator(isPassword, isConfirmPassword) && (
              <p>Password and Confirm Password does not match</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;

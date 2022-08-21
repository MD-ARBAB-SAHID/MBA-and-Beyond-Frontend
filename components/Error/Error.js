import Styles from "./Error.module.css";
const Error = (props) => {
  const { errorCode, errorText } = props;
  return (
    <div className={Styles["container"]}>
      <h1 className={Styles["code"]}>{errorCode || 404}</h1>
      <p className={Styles["text"]}>{errorText || "Uh Oh! Page not found!"}</p>
    </div>
  );
};

export default Error;

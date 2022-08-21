import Styles from "./Button.module.css";
import Link from "next/link";

const Button = (props) => {
  return (
    <div className={`${Styles["a-container"]} `}>
      <Link href={props.route}>
        <a className={`${Styles["learn-more"]}`} target="_blank">
          <span className={Styles["circle"]} aria-hidden="true">
            <span className={`${Styles["icon"]} ${Styles["arrow"]}`}></span>
          </span>
          <span className={Styles["a-text"]}>Read More</span>
        </a>
      </Link>
    </div>
  );
};
export default Button;

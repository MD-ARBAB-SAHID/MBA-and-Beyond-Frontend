import styles from "./Input.module.css";
import { useState } from "react";
const Input = (props) => {
  const { isInput, setInput, placeholder, type, errorText, isText } = props;
  const [isTouchedFirst, setTouched] = useState(false);
  const [isInputOnFocus, setInputFocus] = useState(false);
  const onFocusValidator = () => {
    if (!isTouchedFirst) {
      setTouched(true);
    }
    setInputFocus(true);
  };

  const onBlurvalidator = () => {
    setInputFocus(false);
  };
  const onChangeHandler = (event) => {
    const result = props.validator(event.target.value);
    if (!result) {
      setInput(event.target.value, false);
    } else {
      setInput(event.target.value, true);
    }
  };
  if (!isText) {
    return (
      <>
        <input
          placeholder={placeholder}
          type={type}
          onFocus={onFocusValidator}
          onBlur={onBlurvalidator}
          onChange={onChangeHandler}
          value={isInput.val}
          disabled={props.disabled || false}
        />

        {isTouchedFirst && !isInput.validity && !isInputOnFocus && (
          <p className={styles.errorClass}>{errorText}</p>
        )}
      </>
    );
  } else {
    return (
      <>
        <textarea
          placeholder={placeholder}
          type={type}
          onFocus={onFocusValidator}
          onBlur={onBlurvalidator}
          onChange={onChangeHandler}
          value={isInput.val}
          disabled={props.disabled || false}
          cols="50"
          rows="10"
        />
        <div className={styles["errorClass"]}>
          {isTouchedFirst && !isInput.validity && !isInputOnFocus && (
            <p>{errorText}</p>
          )}
        </div>
      </>
    );
  }
};
export default Input;

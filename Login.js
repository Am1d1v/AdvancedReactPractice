import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [inputEmail, setInputEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [inputPassword, setInputPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  // Controll state using useEffect()
  // useEffect(() => {
  //     const timer =  setTimeout(() => {
  //       console.log('Initialization text');
  //       setFormIsValid(inputEmail.includes("@") && inputPassword.trim().length > 6);
  //     }, 2000);

  //     // Clear function
  //     return () => {
  //       console.log('Cleared');
  //       clearTimeout(timer);
  //     }
  // }, [inputEmail, inputPassword]);

  const emailReducer = (previousState, action) => {

    if(action.type === 'USER_INPUT'){
      return {
        value: action.value,
        isValid: action.value.includes('@')
      }
    }

    if(action.type === 'INPUT_BLUR'){
      return{
        value: previousState.value,
        isValid: previousState.value.includes('@')
      }
    }

    return {
      value: '',
      isValid: false
    }
  }

  // Controll state using useReducer()
     const [emailState, dispatchEmailState] =  useReducer(emailReducer, {value: '', isValid: undefined});

  // Email controllable Input
  const emailChangeHandler = (event) => {
    dispatchEmailState({type: 'USER_INPUT', value: event.target.value});

    // Checking is form(email and password) valid
    setFormIsValid(
      emailState.isValid && inputPassword.trim().length > 6
    )
  };

  

  // Password controllable Input 
  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);

    // Checking is form(email and password) valid
    setFormIsValid(
      emailState.isValid  && inputPassword.trim().length > 6
    )
  };

  // Email Input Validation
  const validateEmailHandler = (event) => {
    dispatchEmailState({type: 'INPUT_BLUE'}) ;
  };

  // Password Input Validation
  const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 6);
  };

  // LogIn button
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid  === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

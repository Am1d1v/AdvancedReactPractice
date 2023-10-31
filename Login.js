import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  //const [inputEmail, setInputEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [inputPassword, setInputPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  // Controlling email state using useReducer()
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
  const [emailState, dispatchEmailState] =  useReducer(emailReducer, {value: '', isValid: undefined});

  
  // Email controllable Input
  const emailChangeHandler = (event) => {
    dispatchEmailState({type: 'USER_INPUT', value: event.target.value});

    // Checking is form(email and password) valid
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    )
  };

  // Controlling password state using useReducer()
    const passwordReducer = (previousState, action) => {
      if(action.type === 'USER_INPUT'){
        return {
          value: action.value,
          isValid: action.value.trim().length > 6
        }
      }
  
      if(action.type === 'INPUT_BLUR'){
        return{
          value: previousState.value,
          isValid: previousState.value.trim().length > 6
        }
      }
      return {
        value: '',
        isValid: false
      }
    }
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {value: '', isValid: undefined})


  // Controll state using useEffect()
  useEffect(() => {
    const timer =  setTimeout(() => {
      console.log('Initialization text');
      setFormIsValid(emailState.isValid && passwordState.value);
    }, 2000);

    // Clear function
    return () => {
      console.log('Cleared');
      clearTimeout(timer);
    }
}, [emailState, passwordState]);  

  // Password controllable Input 
  const passwordChangeHandler = (event) => {

    dispatchPasswordState({type: 'USER_INPUT', value: event.target.value})

    // Checking is form(email and password) valid
    setFormIsValid(
      emailState.isValid  && passwordState.isValid
    )
  };

  // Email Input Validation
  const validateEmailHandler = (event) => {
    dispatchEmailState({type: 'INPUT_BLUR'}) ;
  };

  // Password Input Validation
  const validatePasswordHandler = () => {
    dispatchEmailState({type: 'INPUT_BLUR'})
  };

  // LogIn button
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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

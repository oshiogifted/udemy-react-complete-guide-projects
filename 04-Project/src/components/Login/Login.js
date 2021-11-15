import React, { useState, useEffect, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

// can be created here bc it doesn't need to interact with anythin defined in the component 'Login' function
// our last state snapshot, and the dispatched action
// watch lecture to learn more about useReducer
// const emailReducer = (state, action) => {
//   return {value: '', isValid: false}; // returning a new state 

// };


const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // managing two separate states - enteredEmail, and emailIsValid
  //const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    
    // debouncing - google it
    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);
    
    /* Cleanup function - runs as a cleanup process before useEffect() executes the next time. 
    It does not run before the first sideEffect function execution, or when the component first renders, only afterwards, and when it unmounts from the DOM*/
    return () =>  {
      console.log('CLEANUP')
      clearTimeout(identifier); // clear the old timer b4 this cleanup function runs
    };
    
    // setFormIsValid evaluates to true since enteredEmail and enteredPassword dependency
    // based on every keystroke entered in the form.
    // these dependencies basically cause setFormIsValid to run again, and again, and again, based on the dependency changes
    // therefore, the button to login can be enabled 
    // !formIsValid = !false = true on first render cycle
    // after setFormIsValid runs based on the dependency, formIsValid evaluates to true and !true = false, which enables the button
    // note: the enter useEffect function re-renders based on changes in dependencies. So any code you add in here will also be evaluated.
  }, [enteredEmail, enteredPassword]); // dependency based on setFormIsValid to update formIsValid state

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

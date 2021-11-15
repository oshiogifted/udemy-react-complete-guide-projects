import React, { useState, useEffect } from 'react';

// AuthContext is an object that will contain a component
// isLoggedIn and onLogout contain default values
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn'); // return the value of 'isLoggedIn' key

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true); // its fine now, cuz we run it in useEffect()
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
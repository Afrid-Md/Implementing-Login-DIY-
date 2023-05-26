import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider=(props)=> {
  const [token, setToken] = useState('');

  const userIsLoggedIn = !!token;

  const logInHandler = (token) => {
    setToken(token);
  };

  const logOutHandler = () => {
    setToken('');
  };

  const authcontext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={authcontext}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;

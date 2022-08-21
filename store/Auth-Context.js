import React, { createContext, useState, useCallback, useEffect } from "react";
const AuthContext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const loginHandler = useCallback((isLogged) => {
    setIsLoggedIn(isLogged);
  }, []);
  const logoutHandler = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const contextValue = {
    isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

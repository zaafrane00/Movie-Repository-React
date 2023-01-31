import { createContext } from "react";
import React, { useState, useEffect } from "react";

const myCtx = createContext({
  email: "",
  password: "",
  isLoggedIn: false,
  hello: null,
  onLogin: (email, password) => {},
  onLogout: () => {},
});
export default myCtx;

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    setIsLoggedIn(true);
    localStorage.setItem("token", "1");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <myCtx.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}>
      {props.children}
    </myCtx.Provider>
  );
};

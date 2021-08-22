import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AuthProvider = (props) => {
  const [authenticator, setAuthenticator] = useState({
    userName: "",
    isAuthenticated: false,
    headerConf: {
      headers: {
        Authorization: "",
      },
    },
  });

  return (
    <AppContext.Provider value={[authenticator, setAuthenticator]}>
      {props.children}
    </AppContext.Provider>
  );
};

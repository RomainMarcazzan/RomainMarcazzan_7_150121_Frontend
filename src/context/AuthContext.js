import React, { useState, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    // email: "",
    // firsname: "",
    // lastname: "",
    // avatar: "",
    // userId: "",
  });
  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };

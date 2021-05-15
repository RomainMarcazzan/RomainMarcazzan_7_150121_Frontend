import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AppRouter = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="navbar">
        <Link to="/">Home Page</Link>
        {!authState.isLoggedIn && (
          <>
            <Link to="/login">Se connecter</Link>
            <Link to="/Signup">S'inscrire</Link>
          </>
        )}
        {authState ? (
          <div>
            {authState.firstname} {authState.lastname}
          </div>
        ) : (
          ""
        )}
      </div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/Signup" exact component={SignupPage} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

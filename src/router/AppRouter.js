import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PostPage from "../pages/PostPage";

const AppRouter = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const logout = () => {
    setAuthState({ isLoggedin: false });
  };

  return (
    <BrowserRouter>
      <div className="navbar">
        {!authState.isLoggedIn && (
          <>
            <Link to="/login">Se connecter</Link>
            <Link to="/Signup">S'inscrire</Link>
          </>
        )}
        {authState.isLoggedIn ? (
          <div>
            <Link to="/">Acceuil</Link>
            <span>
              {authState.user.firstname} {authState.user.lastname}
            </span>
            <Link to="/" onClick={logout}>
              Se déconnecter
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/Signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/post/:id" component={PostPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

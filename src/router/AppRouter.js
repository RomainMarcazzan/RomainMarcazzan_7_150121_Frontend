import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PostPage from "../pages/PostPage";
import { Avatar } from "@material-ui/core";
import ProfilePage from "../pages/ProfilePage";

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
            <Link to="/" onClick={logout}>
              Se déconnecter
            </Link>
            <Link to={`/profile/${authState.user.id}`}>
              <Avatar src={authState.user.avatar} />
              {authState.user.firstname} {authState.user.lastname}
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
        <Route path="/profile/:id" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

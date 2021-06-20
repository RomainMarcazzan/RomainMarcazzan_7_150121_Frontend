import React, { useContext, useState } from "react";
import "./AppRouter.css";
import logo from "../images/logo.png";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PostPage from "../pages/PostPage";
import { Avatar } from "@material-ui/core";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import MenuIcon from "@material-ui/icons/Menu";

const AppRouter = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [isToggled, setIstoggled] = useState(false);
  const logout = () => {
    setAuthState({ isLoggedin: false });
  };

  const menuHandler = () => {
    setIstoggled(!isToggled);
  };

  return (
    <BrowserRouter>
      {console.log(authState)}
      <div className="navbar">
        <img className="navbar__logo" src={logo} alt="logo groupomania" />
        <MenuIcon onClick={menuHandler} className="navbar_hamburger" />
        {!authState.isLoggedIn && (
          <div
            className={
              isToggled
                ? "navbar__registration--toggled"
                : "navbar__registration"
            }
          >
            <Link to="/login">Se connecter</Link>
            <Link to="/Signup">S'inscrire</Link>
          </div>
        )}
        {authState.isLoggedIn ? (
          <div
            className={
              isToggled
                ? "navbar__registration--toggled"
                : "navbar__registration"
            }
          >
            <Link to="/">Acceuil</Link>
            {authState.user.isAdmin ? <Link to="/admin">Admin</Link> : ""}
            <Link to="/" onClick={logout}>
              Se déconnecter
            </Link>
            <Link
              className="navbar__registration__info"
              to={`/profile/${authState.user.id}`}
            >
              <Avatar
                className="navbar__registration__info__avatar"
                src={authState.user.avatar}
              />
              <div className="navbar__registration__info__firstname">
                {authState.user.firstname}
              </div>
              <div className="navbar__registration__info__lastname">
                {authState.user.lastname}
              </div>
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
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

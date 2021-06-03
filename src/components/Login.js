import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Login.css";
import logo_background from "../images/logo-background.png";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const Login = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/auth/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        if (response.data.error) {
          setAuthState({ isLoggedIn: false });
        } else {
          setAuthState({
            isLoggedIn: true,
            user: response.data.user,
          });
          history.push("/");
        }
      });
  };

  return (
    <div className="login__container">
      <img src={logo_background} className="login__container__image" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="login__container__form">
          <ErrorMessage name="email" component="i" />
          <Field
            name="email"
            placeholder="email"
            className="login__container__email"
          />
          <ErrorMessage name="password" component="i" />
          <Field
            type="password"
            name="password"
            placeholder="mot de passe"
            className="login__container__password"
          />
          <Button type="submit" className="login__container__button">
            Se connecter
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

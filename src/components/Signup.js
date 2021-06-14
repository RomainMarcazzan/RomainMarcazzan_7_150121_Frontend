import React, { useContext } from "react";
import "./Signup.css";
import logo_background from "../images/logo-background.png";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const Signup = () => {
  const history = useHistory("/");
  const [, setAuthState] = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    isAdmin: false,
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(20).required(),
    firstname: Yup.string().min(3).max(20).required(),
    lastname: Yup.string().min(3).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/auth/signup", data)
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
    <div className="signup__container">
      <img
        src={logo_background}
        alt="logo groupomania"
        className="signup__container__image"
      />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="signup__container__form">
          <ErrorMessage name="email" component="i" />
          <Field
            placeholder="email"
            className="signup__container__email"
            name="email"
          />
          <ErrorMessage name="password" component="i" />
          <Field
            className="signup__container__password"
            type="password"
            name="password"
            placeholder="mot de passe"
          />
          <ErrorMessage name="firstname" component="i" />
          <Field
            placeholder="prénom"
            className="signup__container__firstname"
            name="firstname"
          />
          <ErrorMessage name="lastname" component="i" />
          <Field
            placeholder="nom"
            className="signup__container__lastname"
            name="lastname"
          />
          <Button className="signup__container__button" type="submit">
            S'inscrire
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;

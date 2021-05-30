import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Login.css";
import logo_center from "../images/logo-center.png";
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
    <div className="login">
      <div className="registration-container">
        <img src={logo_center} />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label>Email: </label>
            <ErrorMessage name="email" component="i" />
            <Field name="email" />
            <label>Mot de passe: </label>
            <ErrorMessage name="password" component="i" />
            <Field type="password" name="password" />
            <Button type="submit">Se connecter</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

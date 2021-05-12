import React from "react";
import "./Login.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const Login = () => {
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
        localStorage.setItem("userId", response.data.userId);
      });
  };

  return (
    <div className="signup">
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
  );
};

export default Login;

import React from "react";
import "./Signup.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const Signup = () => {
  const initialValues = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    isAdmin: false,
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
        console.log("signup envoyé");
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
          <label>Prénom: </label>
          <ErrorMessage name="firstname" component="i" />
          <Field name="firstname" />
          <label>Nom: </label>
          <ErrorMessage name="lastname" component="i" />
          <Field name="lastname" />
          <Button type="submit">S'inscrire</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;

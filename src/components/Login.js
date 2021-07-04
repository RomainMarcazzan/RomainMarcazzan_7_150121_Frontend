import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Login.css";
import logo_background from "../images/logo-background.png";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Login = () => {
  const [, setAuthState] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
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
        if (response.data.error) {
          setAuthState({ isLoggedIn: false });
        } else {
          localStorage.setItem("token", response.data.token);
          setAuthState({
            isLoggedIn: true,
            user: response.data.user,
          });
          history.push("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.error);
          setIsOpenModal(true);
        } else console.log(error);
      });
  };

  return (
    <div className="login__container">
      <ReactModal
        isOpen={isOpenModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "2rem",
            textAlign: "center",
            height: "6rem",
          },
        }}
      >
        <div className="error-container">
          <p>{errorMessage}</p>
          <button onClick={() => setIsOpenModal(false)}>Ok</button>
        </div>
      </ReactModal>
      <img
        src={logo_background}
        className="login__container__image"
        alt="logo_globe"
      />
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

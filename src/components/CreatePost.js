import React from "react";
import "./Signup.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const CreatePost = () => {
  const initialValues = {
    userId: localStorage.getItem("userId"),
    title: "",
    imageUrl: "",
    isFlaged: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).max(20).required(),
    imageUrl: Yup.string().min(3).max(20),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/api/posts/", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        // "Content-type": "application/json",
      },
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
          <label>Title: </label>
          <ErrorMessage name="title" component="i" />
          <Field name="title" />
          <label>Image: </label>
          <ErrorMessage name="imageUrl" component="i" />
          <Field name="imageUrl" />
          <Button type="submit">Poster</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;

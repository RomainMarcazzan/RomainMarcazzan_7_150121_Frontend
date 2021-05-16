import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import "./Signup.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";

const CreatePost = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [postState, setPostState] = useContext(PostContext);

  const initialValues = {
    userId: authState.user.id,
    title: "",
    imageUrl: "",
    isFlaged: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).max(20).required(),
    imageUrl: Yup.string().min(3).max(20),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/posts/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          // "Content-type": "application/json",
        },
      })
      .then(() => setPostState(true))
      .catch((error) => console.log(error));
  };

  console.log(postState);
  console.log(authState);

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

// const CreatePost = () => {
//   const [fileData, setFileData] = useState("");
//   const getFile = (e) => {
//     setFileData(e.target.files[0]);
//   };

//   const uploadFile = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("file", fileData);
//     axios
//       .post("http://localhost:5000/api/posts/", data, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//           // "Content-type": "application/json",
//         },
//       })
//       .then((response) => console.log(response))
//       .catch((error) => console.log(error));
//   };
//   return (
//     <form onSubmit={uploadFile}>
//       <input type="file" name="file" onChange={getFile} />
//       <input type="submit" name="upload" value="Upload" />
//     </form>
//   );
// };

export default CreatePost;

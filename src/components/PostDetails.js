import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import axios from "axios";
import Comment from "./Comment";

const PostDetails = (props) => {
  const { id } = useParams();

  const [authState, setAuthState] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentState, setCommentState] = useState(false);

  const initialValues = {
    userId: authState.user.id,
    comment: "",
    isFlaged: false,
    postId: id,
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string().min(2).required(),
  });

  const submitHandler = (data) => {
    axios
      .post("http://localhost:5000/api/comments/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setCommentState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setComments(response.data);
        setCommentState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentState]);

  return (
    <div className="postDetails-container" onClick={props.onClick}>
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      <div className="title">{props.title}</div>
      {authState.user.id === props.userId ? (
        <>
          <button>Modifier</button>
          <button onClick={props.onDelete}>Supprimer</button>
        </>
      ) : (
        ""
      )}
      <img src={props.imageUrl} />
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        <Form>
          <ErrorMessage name="comment" component="span" />
          <Field name="comment" />
          <Button type="submit">Envoyer</Button>
        </Form>
      </Formik>
      <div className="comments-container">
        {comments.map((value, key) => (
          <Comment
            key={key}
            comment={value.comment}
            firstname={value.User.firstname}
            lastname={value.User.lastname}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetails;

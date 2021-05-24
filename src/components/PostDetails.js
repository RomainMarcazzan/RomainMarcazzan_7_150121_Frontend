import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import Comment from "./Comment";

const PostDetails = (props) => {
  const { id } = useParams();

  const [authState, setAuthState] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentState, setCommentState] = useContext(CommentContext);

  const initialValues = {
    userId: authState.user.id,
    comment: "",
    isFlaged: false,
    postId: id,
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string().min(2).required(),
  });

  const submitCommentHandler = (data, { resetForm }) => {
    axios
      .post("http://localhost:5000/api/comments/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setCommentState(true);
        resetForm({});
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
    <div className="postDetails-container">
      <Avatar src={props.avatar} />
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      <div className="title">{props.title}</div>
      {authState.user.id === props.userId ? (
        <>
          <Button>Modifier</Button>
          <Button onClick={props.onDelete}>Supprimer</Button>
        </>
      ) : (
        ""
      )}
      <img src={props.imageUrl} />
      <Formik
        initialValues={initialValues}
        onSubmit={submitCommentHandler}
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
            commentId={value.id}
            comment={value.comment}
            firstname={value.User.firstname}
            lastname={value.User.lastname}
            userId={value.User.id}
            avatar={value.User.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetails;

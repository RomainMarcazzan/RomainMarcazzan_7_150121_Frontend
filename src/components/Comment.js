import { Avatar, Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Comment = (props) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [commentState, setCommentState] = useContext(CommentContext);
  const [modify, setModify] = useState(false);
  const initialValues = {
    comment: props.comment,
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string().min(1).required(),
  });

  const deleteCommentHandler = () => {
    axios
      .delete(`http://localhost:5000/api/comments/${props.commentId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => setCommentState(true))
      .catch((error) => console.log(error));
  };

  const modifyCommentHandler = (data, { resetForm }) => {
    axios
      .put(`http://localhost:5000/api/comments/${props.commentId}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setCommentState(true);
        setModify(false);
        resetForm({});
      })
      .catch((error) => console.log(error));
    console.log(data);
  };

  return (
    <div className="comment-container">
      <Avatar src={props.avatar} />
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      {!modify ? <div className="comment">{props.comment}</div> : ""}
      {modify ? (
        <Formik
          initialValues={initialValues}
          onSubmit={modifyCommentHandler}
          validationSchema={validationSchema}
        >
          <Form>
            <ErrorMessage name="comment" component="span" />
            <Field name="comment" />
            <Button type="submit">Modifier</Button>
          </Form>
        </Formik>
      ) : (
        ""
      )}

      {authState.user.id === props.userId ? (
        <>
          <Button
            onClick={() => {
              setModify(true);
            }}
          >
            Modifier
          </Button>
          <Button onClick={deleteCommentHandler}>Supprimer</Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;

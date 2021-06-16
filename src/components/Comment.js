import React, { useContext, useState } from "react";
import "./Comment.css";
import { Avatar, Button } from "@material-ui/core";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Send } from "@material-ui/icons";

const Comment = (props) => {
  const [authState] = useContext(AuthContext);
  const [, setCommentState] = useContext(CommentContext);
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
  };

  return (
    <div className="comment-container">
      <div className="comment-container__info">
        <Avatar src={props.avatar} />
        <div className="firstname">{props.firstname}</div>
        <div className="lastname">{props.lastname}</div>
      </div>
      <div className="comment-container__date">
        {new Date(props.updatedAt).toLocaleDateString("fr-FR")}
      </div>
      {!modify ? (
        <div className="comment-container__comment">{props.comment}</div>
      ) : (
        ""
      )}
      {modify ? (
        <Formik
          initialValues={initialValues}
          onSubmit={modifyCommentHandler}
          validationSchema={validationSchema}
        >
          <Form>
            {/* <ErrorMessage name="comment" component="span" /> */}
            <Field className="comment-container__form-modify" name="comment" />
            <Button type="submit">
              <Send />
            </Button>
          </Form>
        </Formik>
      ) : (
        ""
      )}

      {authState.user.userId === props.userId && !modify ? (
        <div className="comment-container__actions">
          <Button
            onClick={() => {
              setModify(true);
            }}
          >
            Modifier
          </Button>
          <Button onClick={deleteCommentHandler}>Supprimer</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;

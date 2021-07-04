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
      .then(() =>
        setCommentState(
          commentState.filter((comment) => {
            return comment.id !== props.commentId;
          })
        )
      )
      .catch((error) => console.log(error));
  };

  const modifyCommentHandler = (data, { resetForm }) => {
    axios
      .put(`http://localhost:5000/api/comments/${props.commentId}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const newCommentState = commentState.map((commentToCheck) =>
          commentToCheck.id === response.data.id
            ? response.data
            : commentToCheck
        );
        setCommentState(newCommentState);
        setModify(false);

        resetForm({});
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="comment-container">
      <div className="comment__info">
        {props.avatar ? (
          <Avatar className="comment__info__avatar" src={props.avatar} />
        ) : (
          <Avatar className="comment__info__avatar" />
        )}
        <div className="comment__info__firstname">{props.firstname}</div>
        <div className="comment__info__lastname">{props.lastname}</div>
      </div>
      <div className="comment__date">
        {new Date(props.updatedAt).toLocaleDateString("fr-FR")}
      </div>
      {!modify ? (
        <div className="comment__comment">{props.comment}</div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={modifyCommentHandler}
          validationSchema={validationSchema}
        >
          <Form>
            {/* <ErrorMessage name="comment" component="span" /> */}
            <Field className="comment__form-modify" name="comment" />
            <Button type="submit">
              <Send />
            </Button>
          </Form>
        </Formik>
      )}

      {authState.user.id === props.userId && !modify ? (
        <div className="comment__actions">
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

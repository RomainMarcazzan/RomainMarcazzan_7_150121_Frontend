import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Avatar, Button } from "@material-ui/core";
import Comment from "../components/Comment";

const PostPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const history = useHistory();

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPostData(response.data.post);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const deletePostHandler = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };

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

  return (
    <div className="postDetails-container">
      <div className="firstname">{postData.User.firstname}</div>
      <div className="lastname">{postData.User.lastname}</div>
      {console.log(postData)}
      <div className="title">{postData.title}</div>
      {authState.user.id === postData.userId ? (
        <>
          <Button>Modifier</Button>
          <Button onClick={deletePostHandler}>Supprimer</Button>
        </>
      ) : (
        ""
      )}
      <img src={postData.imageUrl} />
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

export default PostPage;

import React, { useEffect, useState, useContext } from "react";
import "./PostPage.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Avatar, Button } from "@material-ui/core";
import Comment from "../components/Comment";
import { ThumbUpAlt, Send, DeleteForever, Report } from "@material-ui/icons";

const PostPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const history = useHistory();

  const [authState] = useContext(AuthContext);
  const [commentState, setCommentState] = useContext(CommentContext);
  const [comments, setComments] = useState([]);

  const [isLiked, setIsLiked] = useState(null);
  const [isReported, setIsReported] = useState(null);

  const initialValues = {
    userId: authState.user.userId,
    comment: "",
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

    axios
      .get(`http://localhost:5000/api/likes/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        response.data.map((like) =>
          like.userId === authState.user.userId
            ? setIsLiked(true)
            : setIsLiked(false)
        );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/api/reports/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        response.data.map((report) =>
          report.userId === authState.user.userId
            ? setIsReported(true)
            : setIsReported(false)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authState.user.userId, id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setComments(response.data.comments);
        setCommentState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentState, setCommentState, id]);

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

  const LikeHandler = () => {
    const dataLike = {
      userId: authState.user.userId,
      postId: id,
    };

    axios
      .post(`http://localhost:5000/api/likes/`, dataLike, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setIsLiked(response.data.isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reportHandler = () => {
    const dataPost = {
      userId: authState.user.userId,
      postId: id,
    };
    axios
      .post(`http://localhost:5000/api/reports/`, dataPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setIsReported(response.data.isReported);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="post-page">
      {postData.User && (
        <div className="post-page__container">
          <div className="post-page__info">
            <Avatar
              className="post-page__info__avatar"
              src={postData.User.avatar}
            />
            <div>{postData.User.firstname}</div>
            <div>{postData.User.lastname}</div>
          </div>
          <div className="post-page__date">
            {new Date(postData.createdAt).toLocaleDateString("fr-FR")}
          </div>
          <div className="post-page__title">{postData.title}</div>
          <img
            className="post-page__image"
            src={postData.imageUrl}
            alt="post"
          />
          <div className="post-page__action">
            {authState.user.userId === postData.userId ? (
              <Button onClick={deletePostHandler}>
                <DeleteForever /> <span>Supprimer</span>
              </Button>
            ) : (
              ""
            )}
            <div className="post-page__action__like" onClick={LikeHandler}>
              <span> j'aime</span>
              <ThumbUpAlt
                style={isLiked ? { color: "#fd2d01" } : { color: "black" }}
              />
            </div>
            <div className="post-page__action__report" onClick={reportHandler}>
              <span> signaler</span>
              <Report
                style={isReported ? { color: "#fd2d01" } : { color: "black" }}
              />
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={submitCommentHandler}
            validationSchema={validationSchema}
          >
            <Form className="post-page__form">
              {/* <ErrorMessage name="comment" component="span" /> */}
              <Field placeholder="Ecrivez un commentaire..." name="comment" />
              <Button type="submit">
                <Send className="post-page__form__send" />
              </Button>
            </Form>
          </Formik>
          <div className="comment">
            {comments.map((value, key) => (
              <Comment
                key={key}
                commentId={value.id}
                comment={value.comment}
                firstname={value.User.firstname}
                lastname={value.User.lastname}
                userId={value.userId}
                avatar={value.User.avatar}
                updatedAt={value.updatedAt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;

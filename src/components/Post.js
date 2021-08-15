import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import Comment from "./Comment";
import { AuthContext } from "../context/AuthContext";
import { CommentContext } from "../context/CommentContext";
import { Avatar, Button } from "@material-ui/core";
import { ThumbUpAlt, Send, DeleteForever, Report } from "@material-ui/icons";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PostContext } from "../context/PostContext";

const Post = (props) => {
  const [authState] = useContext(AuthContext);
  const [commentState, setCommentState] = useContext(CommentContext);
  const [postState, setPostState] = useContext(PostContext);
  const [isLiked, setIsLiked] = useState(null);
  const [isReported, setIsReported] = useState(null);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://groupomania-server-backend.herokuapp.com/api/reports/${props.postId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        response.data.map((report) =>
          report.userId === authState.user.id
            ? setIsReported(true)
            : setIsReported(false)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isReported]);

  useEffect(() => {
    axios
      .get(
        `https://groupomania-server-backend.herokuapp.com/api/likes/${props.postId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        response.data.map((like) =>
          like.userId === authState.user.id
            ? setIsLiked(true)
            : setIsLiked(false)
        );
        setNumberOfLikes(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLiked]);

  const removePostHandler = () => {
    axios
      .delete(
        `https://groupomania-server-backend.herokuapp.com/api/posts/${props.postId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(
        setPostState(
          postState.filter((post) => {
            return post.id !== props.postId;
          })
        )
      )
      .catch((error) => console.log(error));
  };
  const LikeHandler = () => {
    const dataLike = {
      userId: authState.user.id,
      postId: props.postId,
    };

    axios
      .post(
        `https://groupomania-server-backend.herokuapp.com/api/likes/`,
        dataLike,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setIsLiked(response.data.isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const reportHandler = () => {
    const dataPost = {
      userId: authState.user.id,
      postId: props.postId,
    };
    axios
      .post(
        `https://groupomania-server-backend.herokuapp.com/api/reports/`,
        dataPost,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setIsReported(response.data.isReported);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initialValues = {
    userId: authState.user.id,
    comment: "",
    postId: props.postId,
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string().min(2).required(),
  });

  const submitCommentHandler = (dataComment, { resetForm }) => {
    axios
      .post(
        "https://groupomania-server-backend.herokuapp.com/api/comments/",
        dataComment,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setCommentState([
          { ...response.data, User: authState.user },
          ...commentState,
        ]);

        resetForm({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="post" onClick={props.onClick}>
      <div className="post__info-container">
        <Avatar className="post__avatar" src={props.avatar} />
        <div className="post__firstname">{props.firstname}</div>
        <div className="post__lastname">{props.lastname}</div>
      </div>
      <div className="post__date">
        {new Date(props.createdAt).toLocaleDateString("fr-FR")}
      </div>
      <div className="post__title">{props.title}</div>
      <img className="post__image" src={props.imageUrl} alt="post" />
      <div className="post__action-container">
        {authState.user.id === props.userId && (
          <Button onClick={removePostHandler}>
            <DeleteForever /> Supprimer
          </Button>
        )}
        <Button onClick={LikeHandler}>
          <ThumbUpAlt
            style={isLiked ? { color: "#fd2d01" } : { color: "black" }}
          />
          J'aime
        </Button>
        <Button onClick={reportHandler}>
          <Report
            style={isReported ? { color: "#fd2d01" } : { color: "black" }}
          />
          Signaler
        </Button>
      </div>
      <div className="post__counts">
        <div className="post__counts__like">{numberOfLikes} j'aime</div>
        <div className="post__counts__coments">
          {props.comments.length} commentaires
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitCommentHandler}
        validationSchema={validationSchema}
      >
        <Form className="post__form">
          <Field placeholder="Ecrivez un commentaire..." name="comment" />
          <Button type="submit">
            <Send className="post__form__send" />
          </Button>
        </Form>
      </Formik>
      <div className="post__comments">
        {props.comments &&
          props.comments.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              comment={comment.comment}
              firstname={comment.User.firstname}
              lastname={comment.User.lastname}
              userId={comment.userId}
              avatar={comment.User.avatar}
              updatedAt={comment.updatedAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Post;

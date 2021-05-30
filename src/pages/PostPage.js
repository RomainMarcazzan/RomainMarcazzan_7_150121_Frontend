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
import { LinkedCameraSharp, ThumbUpAlt } from "@material-ui/icons";

const PostPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const history = useHistory();

  const [authState, setAuthState] = useContext(AuthContext);
  const [commentState, setCommentState] = useContext(CommentContext);
  const [comments, setComments] = useState([]);

  const [isLiked, setIsLiked] = useState(null);

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

    axios
      .get(`http://localhost:5000/api/likes/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        response.data.map((like) =>
          like.userId === authState.user.id
            ? setIsLiked(true)
            : setIsLiked(false)
        );
      })
      .catch((error) => {
        console.log(error);
      });
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

  const LikeHandler = () => {
    const dataLike = {
      userId: authState.user.id,
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

  return (
    <div className="postDetails-container">
      {postData.User && (
        <div>
          <div>{postData.User.firstname}</div>
          <div>{postData.User.lastname}</div>
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
        </div>
      )}
      <ThumbUpAlt
        onClick={LikeHandler}
        style={isLiked ? { color: "orange" } : { color: "black" }}
      />

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

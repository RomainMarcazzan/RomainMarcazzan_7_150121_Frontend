import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PostDetails from "../components/PostDetails";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const history = useHistory();

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => history.push("/"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setPost(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <PostDetails
      userId={post.userId}
      title={post.title}
      imageUrl={post.imageUrl}
      firstname={post.firstname}
      lastname={post.lastname}
      onDelete={deleteHandler}
    />
  );
};

export default PostPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

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

  console.log(post);
  return (
    <Post
      title={post.title}
      imageUrl={post.imageUrl}
      firstname={post.firstname}
      lastname={post.lastname}
    />
  );
};

export default PostPage;

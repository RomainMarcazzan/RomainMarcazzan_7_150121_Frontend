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
    <div>
      {post.title} {post.imageUrl}
      {post.firstname}
      {post.lastname}
    </div>
  );
};

export default PostPage;

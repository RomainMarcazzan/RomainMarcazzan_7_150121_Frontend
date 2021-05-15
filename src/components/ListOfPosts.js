import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import Post from "./Post";

const ListOfPosts = () => {
  const [postState, setPostState] = useContext(PostContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPosts(response.data);
        setPostState(false);
      })
      .catch((error) => console.log(error));
  }, [postState]);

  return (
    <div>
      {posts.map((post, key) => (
        <Post
          key={key}
          title={post.title}
          imageUrl={post.imageUrl}
          firstname={post.User.firstname}
          lastname={post.User.lastname}
        />
      ))}
    </div>
  );
};

export default ListOfPosts;

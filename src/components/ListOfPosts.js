import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import Post from "./Post";

const ListOfPosts = () => {
  const [postState, setPostState] = useContext(PostContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
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
          onClick={() => history.push(`/post/${post.id}`)}
          avatar={post.User.avatar}
        />
      ))}
    </div>
  );
};

export default ListOfPosts;

import React, { useContext, useEffect, useState } from "react";
import "./ListOfPosts.css";
import axios from "axios";
import { PostContext } from "../context/PostContext";
import { CommentContext } from "../context/CommentContext";
import Post from "./Post";

const ListOfPosts = () => {
  const [postState, setPostState] = useContext(PostContext);
  const [commentState, setCommentState] = useContext(CommentContext);

  useEffect(() => {
    axios
      .get("https://groupomania-server-backend.herokuapp.com/api/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPostState(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("https://groupomania-server-backend.herokuapp.com/api/comments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCommentState(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="list-of-posts">
      {postState.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          title={post.title}
          imageUrl={post.imageUrl}
          firstname={post.User.firstname}
          lastname={post.User.lastname}
          comments={commentState.filter(
            (comments) => comments.postId === post.id
          )}
          avatar={post.User.avatar}
          createdAt={post.createdAt}
          userId={post.userId}
        />
      ))}
    </div>
  );
};

export default ListOfPosts;

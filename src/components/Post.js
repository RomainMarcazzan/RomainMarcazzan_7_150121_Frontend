import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";
const Post = (props) => {
  return (
    <div className="post-container" onClick={props.onClick}>
      <Avatar>{props.firstname.substring(0, 1)}</Avatar>
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      <div className="title">{props.title}</div>
      <img src={props.imageUrl} />
    </div>
  );
};

export default Post;

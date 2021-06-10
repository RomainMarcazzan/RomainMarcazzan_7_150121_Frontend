import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";
const Post = (props) => {
  return (
    <div className="post" onClick={props.onClick}>
      <div className="post__info-container">
        <Avatar className="post__info-container__avatar" src={props.avatar} />
        <div className="post__info-container__firstname">{props.firstname}</div>
        <div className="post__info-container__lastname">{props.lastname}</div>
      </div>
      <div className="post__title">{props.title}</div>
      <img className="post__image" src={props.imageUrl} alt="post" />
    </div>
  );
};

export default Post;

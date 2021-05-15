import React from "react";

const Post = (props) => {
  return (
    <div className="prop-container">
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      <div className="title">{props.title}</div>
      <div className="image">{props.imageUrl}</div>
    </div>
  );
};

export default Post;

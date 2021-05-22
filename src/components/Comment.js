import React from "react";

const Comment = (props) => {
  return (
    <div className="comment-container">
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      <div className="comment">{props.comment}</div>
    </div>
  );
};

export default Comment;

import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Post.css";
const Post = (props) => {
  const [authState, setAuthState] = useContext(AuthContext);
  return (
    <div className="post-container" onClick={props.onClick}>
      <div className="firstname">{props.firstname}</div>
      <div className="lastname">{props.lastname}</div>
      <div className="title">{props.title}</div>
      {authState.user.firstname === props.firstname ? (
        <>
          <button>Modifier</button>
          <button>Supprimer</button>
        </>
      ) : (
        ""
      )}
      <img src={props.imageUrl} />
    </div>
  );
};

export default Post;

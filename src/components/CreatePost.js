import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import "./CreatePost.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Gif, Image } from "@material-ui/icons";

const CreatePost = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [postState, setPostState] = useContext(PostContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", authState.user.id);
    data.append("title", title);
    data.append("imageUrl", file);

    axios
      .post("http://localhost:5000/api/posts/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setTitle("");
        setPostState(true);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={onSubmit} className="create-post">
      <div className="create-post__title-container">
        <input
          placeholder="Dites quelque chose..."
          className="create-post__title"
          type="text"
          id="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="create-post__file-container">
        <label
          htmlFor="file"
          className="create-post__file"
          aria-label="Image ou Gif"
        >
          <Image />
          <Gif fontSize="large" />
        </label>
        <input
          type="file"
          id="file"
          onChange={(event) => {
            const file = event.target.files[0];
            setFile(file);
          }}
        />
        <Button className="create-post__button" type="submit">
          Publier
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;

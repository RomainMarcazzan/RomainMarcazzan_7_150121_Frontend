import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import "./Signup.css";
import axios from "axios";
import { Button } from "@material-ui/core";

const CreatePost = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [postState, setPostState] = useContext(PostContext);

  const onSubmit = () => {
    const data = new FormData();
    data.append("userId", authState.user.id);
    data.append("title", title);
    data.append("isFlaged", false);
    data.append("imageUrl", file);

    axios
      .post("http://localhost:5000/api/posts/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setPostState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input
        type="text"
        id="title"
        onChange={(event) => {
          const { value } = event.target;
          setTitle(value);
        }}
      />
      <input
        type="file"
        id="file"
        onChange={(event) => {
          const file = event.target.files[0];
          setFile(file);
        }}
      />
      <Button type="button" onClick={onSubmit}>
        Envoyer
      </Button>
    </div>
  );
};

export default CreatePost;

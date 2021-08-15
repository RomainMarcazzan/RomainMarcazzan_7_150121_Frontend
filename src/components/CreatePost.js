import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import "./CreatePost.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Gif, Image } from "@material-ui/icons";
import ReactModal from "react-modal";

const CreatePost = () => {
  const [authState] = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [postState, setPostState] = useContext(PostContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", authState.user.id);
    data.append("title", title);
    data.append("imageUrl", file);

    axios
      .post(
        "https://groupomania-server-backend.herokuapp.com/api/posts/",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        const newPostState = [...postState];
        newPostState.splice(0, 0, {
          ...response.data,
          userId: parseInt(response.data.userId),
          User: { ...authState.user },
        });
        setPostState(newPostState);

        setTitle("");
        e.target.reset();
      })
      .catch(() => {
        setIsOpenModal(true);
      });
  };
  return (
    <form onSubmit={onSubmit} className="create-post">
      <ReactModal
        isOpen={isOpenModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "2rem",
            height: "6rem",
          },
        }}
      >
        <div className="error-container">
          <p>Un post doit contenir au minimum un titre et/ou une image</p>
          <button onClick={() => setIsOpenModal(false)}>Ok</button>
        </div>
      </ReactModal>
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

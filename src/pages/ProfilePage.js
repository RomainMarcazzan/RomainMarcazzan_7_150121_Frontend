import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Avatar } from "@material-ui/core";
import { useParams } from "react-router";

const ProfilePage = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [avatarFile, setAvatarFile] = useState(null);

  const { id } = useParams();

  const onSubmit = () => {
    const data = new FormData();
    data.append("avatar", avatarFile);

    axios
      .put(`http://localhost:5000/api/profile/${id}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div classna="profile-container">
      <Avatar src={authState.user.avatar} />
      <input
        type="file"
        id="avatarFile"
        onChange={(event) => {
          const avatarFile = event.target.files[0];
          setAvatarFile(avatarFile);
        }}
      />
      <Button type="button" onClick={onSubmit}>
        Envoyer
      </Button>
    </div>
  );
};

export default ProfilePage;

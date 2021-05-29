import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Avatar } from "@material-ui/core";

const ProfilePage = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [profileState, setProfileState] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAuthState({ ...authState, user: response.data.user });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profileState]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("avatar", avatarFile);

    axios
      .put(`http://localhost:5000/api/profile/${id}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setProfileState(true);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile-container">
      {authState.user.avatar ? (
        <Avatar src={authState.user.avatar} />
      ) : (
        <Avatar />
      )}
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

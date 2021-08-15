import React, { useState, useContext } from "react";
import "./ProfilePage.css";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Avatar } from "@material-ui/core";
import { DeleteForever, Image, Send } from "@material-ui/icons";

const ProfilePage = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [avatarFile, setAvatarFile] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  const changeAvatarHandler = () => {
    const data = new FormData();
    data.append("avatar", avatarFile);

    axios
      .put(
        `https://groupomania-server-backend.herokuapp.com/api/profile/${id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setAuthState({ ...authState, user: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProfileHandler = () => {
    axios
      .delete(
        `https://groupomania-server-backend.herokuapp.com/api/profile/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setAuthState({ isLoggedIn: false, user: null });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile">
      {authState.user ? (
        <div className="profile-container">
          <span className="profile-container__title">Modifier avatar</span>
          {authState.user.avatar ? (
            <Avatar
              className="profile-container__avatar"
              src={authState.user.avatar}
            />
          ) : (
            <Avatar className="profile-container__avatar" />
          )}
          <div className="profile-container__actions">
            <label htmlFor="avatarFile" className="profile-container__file">
              <Image />
            </label>
            <input
              type="file"
              id="avatarFile"
              onChange={(event) => {
                const avatarFile = event.target.files[0];
                setAvatarFile(avatarFile);
              }}
            />
            <Button>
              <Send
                type="button"
                onClick={changeAvatarHandler}
                className="profile-container__send"
              />
            </Button>
          </div>
          <div className="profile-container__delete">
            <span className="profile-container__title">
              Supprimer son compte
            </span>
            <div className="profile-container__file">
              <DeleteForever onClick={deleteProfileHandler} />
            </div>
          </div>
        </div>
      ) : (
        <div>Profil Supprimé</div>
      )}
    </div>
  );
};

export default ProfilePage;

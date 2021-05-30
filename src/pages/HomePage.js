import React, { useContext } from "react";
import "./HomePage.css";
import CreatePost from "../components/CreatePost";
import ListOfPosts from "../components/ListOfPosts";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <div className="home-page">
      {authState.isLoggedIn && (
        <>
          <CreatePost />
          <ListOfPosts />
        </>
      )}
    </div>
  );
};

export default HomePage;

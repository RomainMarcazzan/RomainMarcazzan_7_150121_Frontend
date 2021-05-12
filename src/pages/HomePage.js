import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import CreatePost from "../components/CreatePost";

const HomePage = () => {
  return (
    <div>
      <Signup />
      <Login />
      <CreatePost />
    </div>
  );
};

export default HomePage;

import React, { useContext, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "../utils/GlobeModel";
import "./HomePage.css";
import CreatePost from "../components/CreatePost";
import ListOfPosts from "../components/ListOfPosts";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <div className="home-page">
      {!authState.isLoggedIn ? (
        <Canvas className="globe-container">
          <ambientLight intensity={0.5} />
          <directionalLight color="white" position={[-5, 5, 0]} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      ) : (
        <div className="home-page__posts">
          <CreatePost />
          <ListOfPosts />
        </div>
      )}
    </div>
  );
};

export default HomePage;

import React, { useContext, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loading from "../components/Loading";
import Model from "../utils/GlobeModel";
import "./HomePage.css";
import CreatePost from "../components/CreatePost";
import ListOfPosts from "../components/ListOfPosts";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [authState] = useContext(AuthContext);

  return (
    <div className="home-page">
      {!authState.isLoggedIn ? (
        <Suspense fallback={<Loading />}>
          <Canvas className="globe-container">
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[-5, 5, 0]} />
            <Model />
          </Canvas>
        </Suspense>
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

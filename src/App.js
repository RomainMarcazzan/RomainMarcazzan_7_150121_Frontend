import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { CommentProvider } from "./context/CommentContext";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <PostProvider>
          <CommentProvider>
            <AppRouter />
          </CommentProvider>
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

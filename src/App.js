import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <AppRouter />
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

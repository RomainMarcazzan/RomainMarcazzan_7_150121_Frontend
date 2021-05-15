import React, { useState, createContext } from "react";
const PostContext = createContext();

const PostProvider = (props) => {
  const [postState, setPostState] = useState(false);

  return (
    <PostContext.Provider value={[postState, setPostState]}>
      {props.children}
    </PostContext.Provider>
  );
};
export { PostContext, PostProvider };

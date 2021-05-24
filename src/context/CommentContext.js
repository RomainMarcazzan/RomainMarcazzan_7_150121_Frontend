import React, { useState, createContext } from "react";
const CommentContext = createContext();

const CommentProvider = (props) => {
  const [commentState, setCommentState] = useState(false);

  return (
    <CommentContext.Provider value={[commentState, setCommentState]}>
      {props.children}
    </CommentContext.Provider>
  );
};
export { CommentContext, CommentProvider };

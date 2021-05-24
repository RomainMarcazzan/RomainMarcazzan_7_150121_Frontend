import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PostDetails from "../components/PostDetails";

const PostPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPostData(response.data.post);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletePostHandler = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };

  return (
    <PostDetails
      userId={postData.userId}
      title={postData.title}
      imageUrl={postData.imageUrl}
      lastname={postData.User.lastname}
      firstname={postData.User.firstname}
      avatar={postData.User.avatar}
      onDelete={deletePostHandler}
    />
  );
};

export default PostPage;

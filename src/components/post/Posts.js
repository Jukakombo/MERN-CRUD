import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
function Posts({setCurrentId}) {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <div>
      
      {posts.map((post) => (
        <Post key={post._id} post={post}  setCurrentId={setCurrentId}/>
      ))}
    </div>
  );
}

export default Posts;

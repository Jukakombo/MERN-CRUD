import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/form/Form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Posts from "./components/post/Posts";
import { useDispatch, useStore } from "react-redux";
import { getPosts } from "./actions/posts";
function App() {
  const [currentId, setCurrentId]=useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch]);

  return (
    
      <div style={{display:"flex"}}>
        <Posts setCurrentId={setCurrentId} />
        <Form currentId ={currentId} setCurrentId={setCurrentId} />
      </div>
    
  );
}

export default App;

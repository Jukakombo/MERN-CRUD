import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

export default function Form({ currentId, setCurrentId }) {

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
    select: "",
  });
  useEffect(()=>{
    if(post)
      setPostData(post);
    
  },[post]);
  // submit function
  const submitHandle = () => {
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  // clear function
  const clear = (event) => {
    event.preventDefault();
    setPostData({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
      select: "",
    });
  };
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={submitHandle}
    >
      <h3 style={{textAlign:"center"}}>{post?"Editing post":"Create post"}</h3>
      <TextField
        name="creator"
        label="Creator"
        variant="outlined"
        value={postData.creator}
        onChange={(event) =>
          setPostData({ ...postData, creator: event.target.value })
        }
      />
      <TextField
        name="title"
        label="Title"
        variant="outlined"
        value={postData.title}
        onChange={(event) =>
          setPostData({ ...postData, title: event.target.value })
        }
      />
      <TextField
        name="message"
        label="Message"
        variant="outlined"
        value={postData.message}
        onChange={(event) =>
          setPostData({ ...postData, message: event.target.value })
        }
      />
      <TextField
        name="select"
        label="Select"
        variant="outlined"
        value={postData.select}
        onChange={(event) =>
          setPostData({ ...postData, select: event.target.value })
        }
      />
      <div className="filebase">
        <FileBase
          name="selectedFile"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
      </div>
      <Button
        type="submit"
        color="primary"
        size="large"
        style={{ backgroundColor: "#5cdb5c", color: "#fff" }}
      >
        Submit
      </Button>

      <Button
        type="submit"
        color="primary"
        size="small"
        onClick={clear}
        style={{ backgroundColor: "#ff0021", color: "#fff" }}
      >
        Clear
      </Button>
    </form>
  );
}

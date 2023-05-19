"use client";
import { Box, Button, Slide, TextField } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const BlogPost = () => {
  const [openPost, setOpenPost] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    body: "",
    authorId: 1,
  });

  const createPost = async () => {
    const resp = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/josn",
      },
      body: JSON.stringify(blog),
    });
  };

  const postOpen = () => {
    setOpenPost(true);
  };

  const closePost = () => {};
  return (
    <Box>
      <Box sx={{ display: "flex", justifySelf: "flex-end" }}>
        <Button onClick={postOpen} variant="contained">
          Post
        </Button>
      </Box>

      <Slide direction="up" in={openPost} mountOnEnter unmountOnExit>
        <Box
          sx={{
            minWidth: "100%",
            minHeight: "100vh",
          }}>
          <Button
            onClick={() => setOpenPost(false)}
            style={{ position: "absolute", right: 0 }}>
            <CloseIcon />
          </Button>
          <TextField
            style={{ marginBottom: 6 }}
            id="standard-basic"
            label="Title"
            variant="standard"
            onChange={(e) => {
              setBlog({ ...blog, title: e.target.value });
            }}
          />
          <TextareaAutosize
            style={{
              minWidth: "100%",
              minHeight: 200,
            }}
            aria-label="empty textarea"
            placeholder="Empty"
            onChange={(e) => {
              setBlog({ ...blog, body: e.target.value });
            }}
          />
          <Button onClick={createPost}> Post Publish</Button>
        </Box>
      </Slide>
    </Box>
  );
};

export default BlogPost;

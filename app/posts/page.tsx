"use client";

import { AuthContext } from "@/context/AuthContext";
import { PostContext } from "@/context/PostContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";

interface Post {
  id: string | null;
  title: string | null;
  body: string | null;
}

const Post = () => {
  const { name } = useContext(AuthContext);
  const [posts, setPost] = useState<Post[]>([
    {
      id: null,
      title: null,
      body: null,
    },
  ]);
  const getData = async () => {
    const resp = await fetch("/api/post");
    const data = await resp.json();
    setPost(data.post);
  };
  useEffect(() => {
    getData();
  }, []);
  // const { updatePost, user, ...data } = useContext(PostContext);
  // console.log("data", user);
  // const [posts, setPosts] = useState([
  //   {
  //     id: "",
  //     title: "",
  //     body: "",
  //   },
  // ]);

  // const getUser = async () => {
  //   const resp = await fetch("/api/user");
  //   const data = await resp.json();
  //   console.log(data);
  // };

  // const getPOst = async () => {
  //   const resp = await fetch("/api/post");
  //   const data = await resp.json();
  //   console.log(data);
  //   setPosts(data);
  // };

  // if (!posts) return <p>Client Error</p>;

  return (
    <Box>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post: Post) => (
          <Box key={post.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom>
                  {name}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {post.title}
                </Typography>
                <Typography variant="body2">{post.body}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Box>
        ))
      ) : (
        <p>No posts available Please Refresh HEE HEE :)</p>
      )}
    </Box>
    // <Box>
    //   {posts &&
    //     posts.map((post: any) => (
    //       <Box key={post.id}>
    //         <Card sx={{ minWidth: 275 }}>
    //           <CardContent>
    //             <Typography
    //               sx={{ fontSize: 14 }}
    //               color="text.secondary"
    //               gutterBottom>
    //               {name}
    //             </Typography>

    //             <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //               adjective
    //             </Typography>
    //             <Typography variant="body2">
    //               well meaning and kindly.
    //               <br />
    //               {'"a benevolent smile"'}
    //             </Typography>
    //           </CardContent>
    //           <CardActions>
    //             <Button size="small">Learn More</Button>
    //           </CardActions>
    //         </Card>
    //       </Box>
    //     ))}
    // </Box>
  );
};

export default Post;

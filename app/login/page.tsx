"use client";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
import Image from "next/image";
import playStore from "../../public/playStore.png";
import microsoft from "../../public/microsoft.png";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { updateData, email, token } = useContext(AuthContext);

  const signin = async () => {
    setError("");
    setSuccess("");
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    // console.log(data);
    if (!resp.ok) {
      setError(data.messg);
    }
    if (resp.ok) {
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("token", data.token);
      updateData({ email: data.user.email, token: data.token });
      setSuccess(data.messg);
      router.push("/");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mx: "auto",
          p: 6,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Instagram
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 6, gap: 4 }}>
          <TextField
            id="outlined-basic"
            label="Phone number, username, or email"
            variant="outlined"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <Button onClick={signin} variant="contained">
            Log in
          </Button>
          <div>
            {error && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "red",
                  fontSize: 20,
                  fontWeight: "bold",
                  mt: 4,
                }}>
                {error}
              </Typography>
            )}
          </div>
          <div>
            {success && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "green",
                  fontSize: 20,
                  fontWeight: "bold",
                  mt: 4,
                }}>
                {success}
              </Typography>
            )}
          </div>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 4 }}>
          <Divider sx={{ width: "40%" }} />
          <Typography>OR</Typography>
          <Divider sx={{ width: "40%" }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <FacebookIcon />
          <Typography>Log in With Facebook</Typography>
        </Box>
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Forgot password
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 400,
          textAlign: "center",
          mx: "auto",
          mt: 4,
          px: 6,
          py: 3,
          border: 1,
          borderColor: "aquamarine",
        }}>
        <Typography>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center", my: 2 }}>Get the app.</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", mx: "auto", gap: 2 }}>
        <Image src={playStore} width={150} height={50} alt="playstore" />
        <Image src={microsoft} width={150} height={50} alt="microsoft" />
      </Box>
    </Box>
  );
};

export default Login;

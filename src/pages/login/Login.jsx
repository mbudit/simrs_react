import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Login failed");
        } else {
          localStorage.setItem("token", data.token);
          setError("");
          setOpenSnackbar(true);
          setIsAuthenticated(true);
          setTimeout(() => {
            setOpenSnackbar(false);
            navigate("/home");
          }, 2000);
        }
      } else {
        const text = await res.text();
        console.error("Unexpected HTML response:", text);
        setError("Unexpected server error (HTML instead of JSON)");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background image with blur */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(src/assets/loginbg.jpeg)`, // Update to your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: 0,
        }}
      />

      {/* Login form container */}
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
          }}
        >
          <Box
            component="img"
            src="/src/assets/logo.png" // Update path if needed
            alt="Logo"
            sx={{
              height: 80,
              marginBottom: 2,
            }}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>

          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/register")}
              >
                Tidak punya akun? Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Anda berhasil login!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;

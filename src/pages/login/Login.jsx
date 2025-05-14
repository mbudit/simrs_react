import React, { useState } from "react";
import { TextField, Button, Container, Typography, Snackbar, Alert, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required!");
        } else {
            try {
                const res = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Login failed");
                } else {
                    // Store the JWT in localStorage or sessionStorage
                    localStorage.setItem("token", data.token);

                    setError("");
                    setOpenSnackbar(true);

                    setTimeout(() => {
                        setOpenSnackbar(false);
                        navigate("/home");
                    }, 3000);
                }
            } catch (err) {
                console.error(err);
                setError("Network error");
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#bfdcff", // Warna biru
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        backgroundColor: "#fff", // Box login putih
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>

                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ marginBottom: 2 }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* 🔑 Wrap fields and button in a form */}
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
                            type="submit" // Important: Submit type
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>
                    </form>

                    <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => navigate("/register")}
                            >
                                Don't have an account? Register
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Auto hide after 3 seconds
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    You have successfully logged in!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
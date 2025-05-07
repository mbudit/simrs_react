import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("Email and Password are required!");
        } else {
            // Logika login Anda di sini
            console.log("Email:", email);
            console.log("Password:", password);
            // Reset error
            setError("");
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
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>

                    <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Button variant="text" color="primary">
                                Forgot Password?
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
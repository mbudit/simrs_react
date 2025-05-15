import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password || !confirmPassword) {
            setError("Semua kolom harus diisi!.");
        } else if (!emailRegex.test(email)) {
            setError("Mohon isi dengan alamat email yang benar!.");
        } else if (password !== confirmPassword) {
            setError("Password tidak sesuai!.");
        } else {
            try {
                const res = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Registration failed");
                } else {
                    // Show popup
                    setSuccessOpen(true);
                    setError("");

                    // Optionally wait 3 seconds, then navigate
                    setTimeout(() => {
                        navigate("/login");
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
                backgroundColor: "#bfdcff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Register
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
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegister}
                        sx={{ marginTop: 2 }}
                    >
                        Daftar
                    </Button>

                    <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => navigate("/login")}
                            >
                                Sudah punya akun? Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Snackbar
                open={successOpen}
                autoHideDuration={4000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: '100%' }} onClose={() => setSuccessOpen(false)}>
                    Akun mu sudah dibuat!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;

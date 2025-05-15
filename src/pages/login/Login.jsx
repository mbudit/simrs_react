import React, { useState } from "react";
import { TextField, Button, Container, Typography, Snackbar, Alert, Box, Grid } from "@mui/material";
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
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            const contentType = res.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Login failed");
                } else {
                    localStorage.setItem("token", data.token); // Optional now but you can keep it
                    setError("");
                    setOpenSnackbar(true);
                    setIsAuthenticated(true);  // Important: notify global auth state
                    setTimeout(() => {
                        setOpenSnackbar(false);
                        navigate("/home");
                    }, 2000);
                    console.log("Navbar props:", { setIsAuthenticated }); // ngecheck autentikasinya ke oper ga
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
                autoHideDuration={3000} // Auto hide after 3 seconds
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Anda berhasil login!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
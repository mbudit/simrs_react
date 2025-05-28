const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register
exports.register = async (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ error: "Registration failed" });

                res.status(201).json({ message: "User registered successfully" });
            }
        );
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Server error" });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: "Salah email atau password" });
        }

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Salah email atau password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_SECRET, {
            expiresIn: "7d"
        });

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 60 * 60 * 1000
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({ message: "Login successful", token });
    });
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
};

// Check authentication
exports.checkAuth = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ authenticated: true, user: decoded });
    } catch (err) {
        return res.json({ authenticated: false });
    }
};

// Decode token
exports.decodeToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ decoded });
    } catch (err) {
        res.status(400).json({ error: "Invalid token", details: err.message });
    }
};

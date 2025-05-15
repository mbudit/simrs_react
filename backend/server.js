require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const FRONTEND_ORIGIN = "http://localhost:5173";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(cors({
  origin: FRONTEND_ORIGIN,   // 👈 NOT "*"
  credentials: true          // 👈 allow cookies to be sent/received
}));

app.use(bodyParser.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET; // move this to env in real use

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post("/decode-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // or jwt.decode(token) for non-verified
    res.json({ decoded });
  } catch (err) {
    res.status(400).json({ error: "Invalid token", details: err.message });
  }
});

app.get("/auth/check", (req, res) => {
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
});

app.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign({ email: decoded.email }, ACCESS_SECRET, { expiresIn: "15m" });
    res.json({ token: newAccessToken });
  });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Registration failed" });

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// Login Route
app.post("/login", (req, res) => {
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

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h"
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000
      })
      .status(200)
      .json({ message: "Login successful", token });
  });
});


app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Middleware to Protect Routes (Auth Middleware)
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Example of a protected route
app.get("/dashboard", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Welcome to your dashboard!", user: req.user });
});




////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// API endpoint buat nyimpen data patients
app.post('/api/patients', (req, res) => {
  const patientData = req.body;

  const sql = `INSERT INTO patients (
    no_ktp, nama_lengkap, tempat_lahir, tanggal_lahir, umur, 
    jenis_kelamin, agama, status, golongan_darah, rhesus, 
    pendidikan, pekerjaan, no_telp, warga_negara, 
    nama_orangtua_wali, no_telp_wali, alamat, rt, rw, 
    kelurahan, kecamatan, kabupaten, provinsi, kode_pos, 
    asuransi, no_asuransi
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    patientData.noKtp,
    patientData.namaLengkap,
    patientData.tempatLahir,
    patientData.tanggalLahir,
    patientData.umur,
    patientData.jenisKelamin,
    patientData.agama,
    patientData.status,
    patientData.goldar,
    patientData.rhesus,
    patientData.pendidikan,
    patientData.pekerjaan,
    patientData.noTelp,
    patientData.wargaNegara,
    patientData.namaOrangtuaWali,
    patientData.noTelpWali,
    patientData.alamat,
    patientData.rt,
    patientData.rw,
    patientData.kelurahan,
    patientData.kecamatan,
    patientData.kabupaten,
    patientData.provinsi,
    patientData.kodePos,
    patientData.asuransi,
    patientData.noAsuransi
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Patient registered successfully', id: result.insertId });
  });
});

// API endpoint buat GET data patients
app.get('/api/patients', (req, res) => {
  const sql = `
    SELECT
      no_ktp, nama_lengkap, tempat_lahir, 
      DATE_FORMAT(tanggal_lahir, '%Y-%m-%d') AS tanggal_lahir, 
      umur, jenis_kelamin, agama, status, golongan_darah, rhesus, 
      pendidikan, pekerjaan, no_telp, warga_negara, 
      nama_orangtua_wali, no_telp_wali, alamat, rt, rw, 
      kelurahan, kecamatan, kabupaten, provinsi, kode_pos, 
      asuransi, no_asuransi
    FROM patients
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});


// DELETE patient by KTP
app.delete('/api/patients/:no_ktp', (req, res) => {
  const noKtp = req.params.no_ktp;

  const sql = 'DELETE FROM patients WHERE no_ktp = ?';
  db.query(sql, [noKtp], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete patient' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  });
});

// UPDATE patient by KTP
app.put('/api/patients/:no_ktp', (req, res) => {
  const { no_ktp } = req.params;
  const {
    nama_lengkap,
    tempat_lahir,
    tanggal_lahir,
    umur,
    jenis_kelamin,
    agama,
    status,
    golongan_darah,
    rhesus,
    pendidikan,
    pekerjaan,
    no_telp,
    warga_negara,
    nama_orangtua_wali,
    no_telp_wali,
    alamat,
    rt,
    rw,
    kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    kode_pos,
    asuransi,
    no_asuransi
  } = req.body;

  const sql = `UPDATE patients SET 
      nama_lengkap = ?, 
      tempat_lahir = ?, 
      tanggal_lahir = ?, 
      umur = ?, 
      jenis_kelamin = ?, 
      agama = ?, 
      status = ?, 
      golongan_darah = ?, 
      rhesus = ?, 
      pendidikan = ?, 
      pekerjaan = ?, 
      no_telp = ?, 
      warga_negara = ?, 
      nama_orangtua_wali = ?, 
      no_telp_wali = ?, 
      alamat = ?, 
      rt = ?, 
      rw = ?, 
      kelurahan = ?, 
      kecamatan = ?, 
      kabupaten = ?, 
      provinsi = ?, 
      kode_pos = ?, 
      asuransi = ?, 
      no_asuransi = ?
    WHERE no_ktp = ?`;

  db.query(sql, [
    nama_lengkap,
    tempat_lahir,
    tanggal_lahir,
    umur,
    jenis_kelamin,
    agama,
    status,
    golongan_darah,
    rhesus,
    pendidikan,
    pekerjaan,
    no_telp,
    warga_negara,
    nama_orangtua_wali,
    no_telp_wali,
    alamat,
    rt,
    rw,
    kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    kode_pos,
    asuransi,
    no_asuransi,
    no_ktp
  ], (err, result) => {
    if (err) {
      console.error('Error updating patient:', err);
      return res.status(500).send('Failed to update');
    }
    res.send('Patient updated successfully');
  });
});

const { v4: uuidv4 } = require("uuid");
app.post("/api/rawatjalan", (req, res) => {
  console.log("POST /api/rajal dipanggil");
  const rajalData = req.body;

  const no_rm = "IRJ-" + uuidv4().split("-")[0];

  const sql = `INSERT INTO rawatjalan (
    no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
    pekerjaan, no_telp, alamat, tgl_daftar, payments,
    no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
    tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    no_rm,
    rajalData.nama_lengkap,
    rajalData.jenis_kelamin,
    rajalData.no_ktp,
    rajalData.tgl_lahir,
    rajalData.status_pernikahan,
    rajalData.pekerjaan,
    rajalData.no_telp,
    rajalData.alamat,
    rajalData.tgl_daftar,
    rajalData.payments,
    rajalData.no_kartu,
    rajalData.poli,
    rajalData.dokter,
    rajalData.jenis_rujukan,
    rajalData.no_rujukan,
    rajalData.tgl_rujukan,
    rajalData.faskes,
    rajalData.no_wa,
    rajalData.nama_wali,
    rajalData.telp_wali,
    rajalData.alasan,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "Rawat Jalan berhasil didaftarkan",
      id: result.insertId,
      no_rm: no_rm,
    });
  });
});

app.get("/api/pasien_rajal", (req, res) => {
  const sql = `
    SELECT
      no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
      pekerjaan, no_telp, alamat, tgl_daftar, payments,
      no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
      tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan
    FROM rawatjalan
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
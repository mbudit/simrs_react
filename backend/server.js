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

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

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

    const refreshToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, {
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
});

app.post('/auth/logout', (req, res) => {
  res.clearCookie("token");
  res.clearCookie('refreshToken'); // Must match cookie name used
  res.status(200).json({ message: "Logged out successfully" });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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
      no_ktp, no_rme, nama_lengkap, tempat_lahir, 
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

  // Logika default untuk no_kartu jika payments adalah "Tidak Ada"
  const no_kartu_final =
    rajalData.payments === "Tidak Ada" ? "Umum" : rajalData.no_kartu;

  // Logika default untuk no_rujukan & tgl_rujukan jika jenis_rujukan adalah "Datang Sendiri"
  const no_rujukan_final =
    rajalData.jenis_rujukan === "Datang Sendiri"
      ? "Tidak Ada"
      : rajalData.no_rujukan;
  const tgl_rujukan_final =
    rajalData.jenis_rujukan === "Datang Sendiri" ? null : rajalData.tgl_rujukan;

  const sql = `INSERT INTO rawatjalan (
    no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
    pekerjaan, no_telp, alamat, tgl_daftar, payments,
    no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
    tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
    no_kartu_final,
    rajalData.poli,
    rajalData.dokter,
    rajalData.jenis_rujukan,
    no_rujukan_final,
    tgl_rujukan_final,
    rajalData.faskes,
    rajalData.no_wa,
    rajalData.nama_wali,
    rajalData.telp_wali,
    rajalData.alasan,
    "Rawat Jalan",
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
      id, no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
      pekerjaan, no_telp, alamat, tgl_daftar, payments,
      no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
      tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan, status
    FROM rawatjalan
    WHERE status = 'Rawat Jalan'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.delete("/api/pasien_rajal/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM rawatjalan WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Failed to delete patient" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  });
});

app.put("/api/update_rajal/:id", (req, res) => {
  const { id } = req.params;
  let {
    nama_lengkap,
    jenis_kelamin,
    no_ktp,
    tgl_lahir,
    status_pernikahan,
    pekerjaan,
    no_telp,
    alamat,
    tgl_daftar,
    payments,
    no_kartu,
    poli,
    dokter,
    jenis_rujukan,
    no_rujukan,
    tgl_rujukan,
    faskes,
    no_wa,
    nama_wali,
    telp_wali,
    alasan,
    status,
  } = req.body;

  // Fungsi untuk mengubah nilai kosong menjadi "Tidak Ada" atau null untuk tanggal
  const checkAndFill = (value, isDate = false) => {
    if (isDate) {
      return value ? value : null; // Jika nilai kosong, kembalikan null
    }
    return value ? value : "Tidak Ada"; // Untuk nilai selain tanggal, kembalikan "Tidak Ada"
  };

  // Menggunakan fungsi checkAndFill untuk setiap kolom
  nama_lengkap = checkAndFill(nama_lengkap);
  jenis_kelamin = checkAndFill(jenis_kelamin);
  no_ktp = checkAndFill(no_ktp);
  tgl_lahir = checkAndFill(tgl_lahir, true);
  status_pernikahan = checkAndFill(status_pernikahan);
  pekerjaan = checkAndFill(pekerjaan);
  no_telp = checkAndFill(no_telp);
  alamat = checkAndFill(alamat);
  tgl_daftar = checkAndFill(tgl_daftar, true);
  payments = checkAndFill(payments);

  // Logika tambahan sesuai permintaan
  if (payments === "Tidak Ada") {
    no_kartu = "Umum";
  } else {
    no_kartu = checkAndFill(no_kartu);
  }

  poli = checkAndFill(poli);
  dokter = checkAndFill(dokter);
  jenis_rujukan = checkAndFill(jenis_rujukan);
  no_rujukan = checkAndFill(no_rujukan);
  tgl_rujukan = checkAndFill(tgl_rujukan, true);
  faskes = checkAndFill(faskes);
  no_wa = checkAndFill(no_wa);
  nama_wali = checkAndFill(nama_wali);
  telp_wali = checkAndFill(telp_wali);
  alasan = checkAndFill(alasan);
  status = checkAndFill(status);

  const sql = `UPDATE rawatjalan SET 
    nama_lengkap = ?, 
    jenis_kelamin = ?, 
    no_ktp = ?, 
    tgl_lahir = ?, 
    status_pernikahan = ?, 
    pekerjaan = ?, 
    no_telp = ?, 
    alamat = ?, 
    tgl_daftar = ?, 
    payments = ?, 
    no_kartu = ?, 
    poli = ?, 
    dokter = ?, 
    jenis_rujukan = ?, 
    no_rujukan = ?, 
    tgl_rujukan = ?, 
    faskes = ?, 
    no_wa = ?, 
    nama_wali = ?, 
    telp_wali = ?, 
    alasan = ?,
    status = ?
  WHERE id = ?`;

  db.query(
    sql,
    [
      nama_lengkap,
      jenis_kelamin,
      no_ktp,
      tgl_lahir,
      status_pernikahan,
      pekerjaan,
      no_telp,
      alamat,
      tgl_daftar,
      payments,
      no_kartu,
      poli,
      dokter,
      jenis_rujukan,
      no_rujukan,
      tgl_rujukan,
      faskes,
      no_wa,
      nama_wali,
      telp_wali,
      alasan,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating patient:", err);
        return res.status(500).send("Failed to update");
      }
      res.send("Patient updated successfully");
    }
  );
});

app.post("/api/igd", (req, res) => {
  console.log("POST /api/igd dipanggil");
  const igdData = req.body;

  const no_rm = "IGD-" + uuidv4().split("-")[0];

  // Logika default untuk no_kartu jika payments adalah "Tidak Ada"
  const no_kartu_final =
    igdData.payments === "Tidak Ada" ? "Umum" : igdData.no_kartu;

  // Logika default untuk no_rujukan & tgl_rujukan jika jenis_rujukan adalah "Datang Sendiri"
  const no_rujukan_final =
    igdData.jenis_rujukan === "Datang Sendiri"
      ? "Tidak Ada"
      : igdData.no_rujukan;
  const tgl_rujukan_final =
    igdData.jenis_rujukan === "Datang Sendiri" ? null : igdData.tgl_rujukan;

  const sql = `INSERT INTO igd (
    no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
    pekerjaan, no_telp, alamat, tgl_daftar, payments,
    no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
    tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    no_rm,
    igdData.nama_lengkap,
    igdData.jenis_kelamin,
    igdData.no_ktp,
    igdData.tgl_lahir,
    igdData.status_pernikahan,
    igdData.pekerjaan,
    igdData.no_telp,
    igdData.alamat,
    igdData.tgl_daftar,
    igdData.payments,
    no_kartu_final,
    igdData.poli,
    igdData.dokter,
    igdData.jenis_rujukan,
    no_rujukan_final,
    tgl_rujukan_final,
    igdData.faskes,
    igdData.no_wa,
    igdData.nama_wali,
    igdData.telp_wali,
    igdData.alasan,
    "IGD",
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "IGD berhasil didaftarkan",
      id: result.insertId,
      no_rm: no_rm,
    });
  });
});

app.get("/api/pasien_igd", (req, res) => {
  const sql = `
    SELECT
      id, no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
      pekerjaan, no_telp, alamat, tgl_daftar, payments,
      no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
      tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan, status
    FROM igd
    WHERE status = 'IGD'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.delete("/api/pasien_igd/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM igd WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Failed to delete patient" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  });
});

app.put("/api/update_igd/:id", (req, res) => {
  const { id } = req.params;
  let {
    nama_lengkap,
    jenis_kelamin,
    no_ktp,
    tgl_lahir,
    status_pernikahan,
    pekerjaan,
    no_telp,
    alamat,
    tgl_daftar,
    payments,
    no_kartu,
    poli,
    dokter,
    jenis_rujukan,
    no_rujukan,
    tgl_rujukan,
    faskes,
    no_wa,
    nama_wali,
    telp_wali,
    alasan,
    status,
  } = req.body;

  // Fungsi untuk mengubah nilai kosong menjadi "Tidak Ada" atau null untuk tanggal
  const checkAndFill = (value, isDate = false) => {
    if (isDate) {
      return value ? value : null; // Jika nilai kosong, kembalikan null
    }
    return value ? value : "Tidak Ada"; // Untuk nilai selain tanggal, kembalikan "Tidak Ada"
  };

  // Menggunakan fungsi checkAndFill untuk setiap kolom
  nama_lengkap = checkAndFill(nama_lengkap);
  jenis_kelamin = checkAndFill(jenis_kelamin);
  no_ktp = checkAndFill(no_ktp);
  tgl_lahir = checkAndFill(tgl_lahir, true);
  status_pernikahan = checkAndFill(status_pernikahan);
  pekerjaan = checkAndFill(pekerjaan);
  no_telp = checkAndFill(no_telp);
  alamat = checkAndFill(alamat);
  tgl_daftar = checkAndFill(tgl_daftar, true);
  payments = checkAndFill(payments);

  // Logika tambahan sesuai permintaan
  if (payments === "Tidak Ada") {
    no_kartu = "Umum";
  } else {
    no_kartu = checkAndFill(no_kartu);
  }

  poli = checkAndFill(poli);
  dokter = checkAndFill(dokter);
  jenis_rujukan = checkAndFill(jenis_rujukan);
  no_rujukan = checkAndFill(no_rujukan);
  tgl_rujukan = checkAndFill(tgl_rujukan, true);
  faskes = checkAndFill(faskes);
  no_wa = checkAndFill(no_wa);
  nama_wali = checkAndFill(nama_wali);
  telp_wali = checkAndFill(telp_wali);
  alasan = checkAndFill(alasan);
  status = checkAndFill(status);

  const sql = `UPDATE igd SET 
    nama_lengkap = ?, 
    jenis_kelamin = ?, 
    no_ktp = ?, 
    tgl_lahir = ?, 
    status_pernikahan = ?, 
    pekerjaan = ?, 
    no_telp = ?, 
    alamat = ?, 
    tgl_daftar = ?, 
    payments = ?, 
    no_kartu = ?, 
    poli = ?, 
    dokter = ?, 
    jenis_rujukan = ?, 
    no_rujukan = ?, 
    tgl_rujukan = ?, 
    faskes = ?, 
    no_wa = ?, 
    nama_wali = ?, 
    telp_wali = ?, 
    alasan = ?,
    status = ?
  WHERE id = ?`;

  db.query(
    sql,
    [
      nama_lengkap,
      jenis_kelamin,
      no_ktp,
      tgl_lahir,
      status_pernikahan,
      pekerjaan,
      no_telp,
      alamat,
      tgl_daftar,
      payments,
      no_kartu,
      poli,
      dokter,
      jenis_rujukan,
      no_rujukan,
      tgl_rujukan,
      faskes,
      no_wa,
      nama_wali,
      telp_wali,
      alasan,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating patient:", err);
        return res.status(500).send("Failed to update");
      }
      res.send("Patient updated successfully");
    }
  );
});

app.post("/api/rawatinap", (req, res) => {
  console.log("POST /api/ranap dipanggil");
  const ranapData = req.body;

  const no_rm = "IRI-" + uuidv4().split("-")[0];

  // Logika default untuk no_kartu jika payments adalah "Tidak Ada"
  const no_kartu_final =
    ranapData.payments === "Tidak Ada" ? "Umum" : ranapData.no_kartu;

  // Logika default untuk no_rujukan & tgl_rujukan jika jenis_rujukan adalah "Datang Sendiri"
  const no_rujukan_final =
    ranapData.jenis_rujukan === "Datang Sendiri"
      ? "Tidak Ada"
      : ranapData.no_rujukan;
  const tgl_rujukan_final =
    ranapData.jenis_rujukan === "Datang Sendiri" ? null : ranapData.tgl_rujukan;

  const sql = `INSERT INTO rawatinap (
    no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
    pekerjaan, no_telp, alamat, tgl_daftar, payments,
    no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
    tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    no_rm,
    ranapData.nama_lengkap,
    ranapData.jenis_kelamin,
    ranapData.no_ktp,
    ranapData.tgl_lahir,
    ranapData.status_pernikahan,
    ranapData.pekerjaan,
    ranapData.no_telp,
    ranapData.alamat,
    ranapData.tgl_daftar,
    ranapData.payments,
    no_kartu_final,
    ranapData.poli,
    ranapData.dokter,
    ranapData.jenis_rujukan,
    no_rujukan_final,
    tgl_rujukan_final,
    ranapData.faskes,
    ranapData.no_wa,
    ranapData.nama_wali,
    ranapData.telp_wali,
    ranapData.alasan,
    ranapData.status || "Rawat Inap",
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      message: "Rawat Inap berhasil didaftarkan",
      id: result.insertId,
      no_rm: no_rm,
    });
  });
});

app.get("/api/pasien_ranap", (req, res) => {
  const sql = `
    SELECT
      id, no_rm, nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
      pekerjaan, no_telp, alamat, tgl_daftar, payments,
      no_kartu, poli, dokter, jenis_rujukan, no_rujukan,
      tgl_rujukan, faskes, no_wa, nama_wali, telp_wali, alasan, status
    FROM rawatinap
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.put("/api/update_ranap/:id", (req, res) => {
  const { id } = req.params;
  let {
    nama_lengkap,
    jenis_kelamin,
    no_ktp,
    tgl_lahir,
    status_pernikahan,
    pekerjaan,
    no_telp,
    alamat,
    tgl_daftar,
    payments,
    no_kartu,
    poli,
    dokter,
    jenis_rujukan,
    no_rujukan,
    tgl_rujukan,
    faskes,
    no_wa,
    nama_wali,
    telp_wali,
    alasan,
    status,
  } = req.body;

  // Fungsi untuk mengubah nilai kosong menjadi "Tidak Ada" atau null untuk tanggal
  const checkAndFill = (value, isDate = false) => {
    if (isDate) {
      return value ? value : null; // Jika nilai kosong, kembalikan null
    }
    return value ? value : "Tidak Ada"; // Untuk nilai selain tanggal, kembalikan "Tidak Ada"
  };

  // Menggunakan fungsi checkAndFill untuk setiap kolom
  nama_lengkap = checkAndFill(nama_lengkap);
  jenis_kelamin = checkAndFill(jenis_kelamin);
  no_ktp = checkAndFill(no_ktp);
  tgl_lahir = checkAndFill(tgl_lahir, true);
  status_pernikahan = checkAndFill(status_pernikahan);
  pekerjaan = checkAndFill(pekerjaan);
  no_telp = checkAndFill(no_telp);
  alamat = checkAndFill(alamat);
  tgl_daftar = checkAndFill(tgl_daftar, true);
  payments = checkAndFill(payments);

  // Logika tambahan sesuai permintaan
  if (payments === "Tidak Ada") {
    no_kartu = "Umum";
  } else {
    no_kartu = checkAndFill(no_kartu);
  }

  poli = checkAndFill(poli);
  dokter = checkAndFill(dokter);
  jenis_rujukan = checkAndFill(jenis_rujukan);
  no_rujukan = checkAndFill(no_rujukan);
  tgl_rujukan = checkAndFill(tgl_rujukan, true);
  faskes = checkAndFill(faskes);
  no_wa = checkAndFill(no_wa);
  nama_wali = checkAndFill(nama_wali);
  telp_wali = checkAndFill(telp_wali);
  alasan = checkAndFill(alasan);
  status = checkAndFill(status);
  if (status === "Tidak Ada") {
    status = "Rawat Inap";
  }

  const sql = `UPDATE rawatinap SET 
    nama_lengkap = ?, 
    jenis_kelamin = ?, 
    no_ktp = ?, 
    tgl_lahir = ?, 
    status_pernikahan = ?, 
    pekerjaan = ?, 
    no_telp = ?, 
    alamat = ?, 
    tgl_daftar = ?, 
    payments = ?, 
    no_kartu = ?, 
    poli = ?, 
    dokter = ?, 
    jenis_rujukan = ?, 
    no_rujukan = ?, 
    tgl_rujukan = ?, 
    faskes = ?, 
    no_wa = ?, 
    nama_wali = ?, 
    telp_wali = ?, 
    alasan = ?,
    status = ?
  WHERE id = ?`;

  db.query(
    sql,
    [
      nama_lengkap,
      jenis_kelamin,
      no_ktp,
      tgl_lahir,
      status_pernikahan,
      pekerjaan,
      no_telp,
      alamat,
      tgl_daftar,
      payments,
      no_kartu,
      poli,
      dokter,
      jenis_rujukan,
      no_rujukan,
      tgl_rujukan,
      faskes,
      no_wa,
      nama_wali,
      telp_wali,
      alasan,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating patient:", err);
        return res.status(500).send("Failed to update");
      }
      res.send("Patient updated successfully");
    }
  );
});

app.delete("/api/pasien_ranap/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM rawatinap WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Failed to delete patient" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
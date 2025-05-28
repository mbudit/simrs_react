require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const rajalRoutes = require('./routes/rajalRoutes');
const igdRoutes = require('./routes/igdRoutes');
const ranapRoutes = require('./routes/ranapRoutes');

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Middlewares
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/', authRoutes);
app.use('/', patientRoutes);
app.use('/', rajalRoutes);
app.use('/', igdRoutes);
app.use('/', ranapRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
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
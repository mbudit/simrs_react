const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: '100.113.21.119',
  user: 'nugi',
  password: 'nugi123',
  database: 'myhospital'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

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
      nama_lengkap, jenis_kelamin, no_ktp, tgl_lahir, status_pernikahan,
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
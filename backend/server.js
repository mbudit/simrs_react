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

// API endpoint to save patient data
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
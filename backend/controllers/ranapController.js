const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createRanap = (req, res) => {
  const ranapData = req.body;
  const no_rm = "IRI-" + uuidv4().split("-")[0];

  const no_kartu_final = ranapData.payments === "Tidak Ada" ? "Umum" : ranapData.no_kartu;
  const no_rujukan_final = ranapData.jenis_rujukan === "Datang Sendiri" ? "Tidak Ada" : ranapData.no_rujukan;
  const tgl_rujukan_final = ranapData.jenis_rujukan === "Datang Sendiri" ? null : ranapData.tgl_rujukan;

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
    ranapData.status,
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
};

exports.getRanapPatients = (req, res) => {
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
};
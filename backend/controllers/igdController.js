const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createIgd = (req, res) => {
  const igdData = req.body;
  const no_rm = "IGD-" + uuidv4().split("-")[0];

  const no_kartu_final = igdData.payments === "Tidak Ada" ? "Umum" : igdData.no_kartu;
  const no_rujukan_final = igdData.jenis_rujukan === "Datang Sendiri" ? "Tidak Ada" : igdData.no_rujukan;
  const tgl_rujukan_final = igdData.jenis_rujukan === "Datang Sendiri" ? null : igdData.tgl_rujukan;

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
};

exports.getIgdPatients = (req, res) => {
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
};

exports.deleteIgdPatient = (req, res) => {
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
};

exports.updateIgdPatient = (req, res) => {
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
  } = req.body;

  const checkAndFill = (value, isDate = false) => {
    if (isDate) return value ? value : null;
    return value ? value : "Tidak Ada";
  };

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
  no_kartu = payments === "Tidak Ada" ? "Umum" : checkAndFill(no_kartu);
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
    alasan = ?
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
};
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createRajal = (req, res) => {
  const rajalData = req.body;
  const no_rm = "IRJ-" + uuidv4().split("-")[0];

  const no_kartu_final = rajalData.payments === "Tidak Ada" ? "Umum" : rajalData.no_kartu;
  const no_rujukan_final = rajalData.jenis_rujukan === "Datang Sendiri" ? "Tidak Ada" : rajalData.no_rujukan;
  const tgl_rujukan_final = rajalData.jenis_rujukan === "Datang Sendiri" ? null : rajalData.tgl_rujukan;

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
};

exports.getRajalPatients = (req, res) => {
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
};

exports.deleteRajalPatient = (req, res) => {
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
};

exports.updateRajalPatient = (req, res) => {
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

  // Helper function
  const checkAndFill = (value, isDate = false) => {
    if (isDate) return value ? value : null;
    return value ? value : "Tidak Ada";
  };

  // Process all fields
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
};
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
    "Rawat Inap",
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

exports.updateRanapPatient = (reg, res) => {
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
}

exports.deleteRanapPatient = (req, res) => {
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
}
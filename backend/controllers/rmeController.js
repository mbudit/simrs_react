const db = require('../config/db');

exports.saveFormData = (req, res) => {
  console.log("Received form data:", req.body); // Debugging: Log the received data

  const formData = req.body;

  const sql = `
    INSERT INTO rme_catatan_klinis (
      tanggal_pemeriksaan, keluhan_utama, riwayat_penyakit_sekarang,
      riwayat_penyakit_dahulu, riwayat_penyakit_keluarga, riwayat_alergi,
      tekanan_darah, nadi, suhu, pernapasan, pemeriksaan_fisik,
      diagnosis_kerja, diagnosis_banding, rencana_terapi, rencana_tindak_lanjut
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    formData.tanggal_pemeriksaan,
    formData.keluhan_utama,
    formData.riwayat_penyakit_sekarang,
    formData.riwayat_penyakit_dahulu,
    formData.riwayat_penyakit_keluarga,
    formData.riwayat_alergi,
    formData.tekanan_darah,
    formData.nadi,
    formData.suhu,
    formData.pernapasan,
    formData.pemeriksaan_fisik,
    formData.diagnosis_kerja,
    formData.diagnosis_banding,
    formData.rencana_terapi,
    formData.rencana_tindak_lanjut,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err); // Debugging: Log database errors
      return res.status(500).json({ error: "Failed to save form data" });
    }
    res.status(201).json({ message: "Form data saved successfully", id: result.insertId });
  });
};

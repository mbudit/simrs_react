const db = require('../config/db');

exports.saveFormData = (req, res) => {
  console.log("Received form data:", req.body); // Debugging: Log the received data

  const formData = req.body;

  const sql = `
    INSERT INTO rme_catatan_klinis (
      no_rme, tanggal_pemeriksaan, dokter, keluhan_utama, riwayat_penyakit_sekarang,
      riwayat_penyakit_dahulu, riwayat_penyakit_keluarga, riwayat_alergi,
      tekanan_darah, nadi, suhu, pernapasan, pemeriksaan_fisik,
      diagnosis_kerja, diagnosis_banding, rencana_terapi, rencana_tindak_lanjut, catatan
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    formData.no_rme,
    formData.tanggal_pemeriksaan,
    formData.dokter,
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
    formData.catatan
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err); // Debugging: Log database errors
      return res.status(500).json({ error: "Failed to save form data" });
    }
    res.status(201).json({ message: "Form data saved successfully", id: result.insertId });
  });
};

exports.getClinicalNotes = (req, res) => {
  const { no_rme } = req.params;
  const sql = `
    SELECT * 
    FROM rme_catatan_klinis
    WHERE no_rme = ?
  `;
  db.query(sql, [no_rme], (err, results) => {
    if (err) {
      console.error("Error fetching clinical notes:", err);
      return res.status(500).json({ error: "Failed to fetch clinical notes" });
    }
    res.json(results);
  });
};

exports.deleteClinicalNote = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM rme_catatan_klinis WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting clinical note:", err);
      return res.status(500).json({ error: "Failed to delete clinical note" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Clinical note not found" });
    }

    res.json({ message: "Clinical note deleted successfully" });
  });
};

exports.getClinicalNoteById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT *
    FROM rme_catatan_klinis
    WHERE id = ?
  `;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching clinical note by ID:", err);
      return res.status(500).json({ error: "Failed to fetch clinical note" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Clinical note not found" });
    }
    res.json(result[0]);
  });
};

exports.updateClinicalNote = (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  const sql = `
    UPDATE rme_catatan_klinis
    SET 
      tanggal_pemeriksaan = ?, dokter = ?, keluhan_utama = ?, riwayat_penyakit_sekarang = ?,
      riwayat_penyakit_dahulu = ?, riwayat_penyakit_keluarga = ?, riwayat_alergi = ?,
      tekanan_darah = ?, nadi = ?, suhu = ?, pernapasan = ?, pemeriksaan_fisik = ?,
      diagnosis_kerja = ?, diagnosis_banding = ?, rencana_terapi = ?, rencana_tindak_lanjut = ?, catatan = ?
    WHERE id = ?
  `;

  const values = [
    formData.tanggal_pemeriksaan,
    formData.dokter,
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
    formData.catatan,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating clinical note:", err);
      return res.status(500).json({ error: "Failed to update clinical note" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Clinical note not found" });
    }

    res.json({ message: "Clinical note updated successfully" });
  });
};
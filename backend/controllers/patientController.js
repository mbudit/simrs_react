const db = require('../config/db');

// Create a new patient
exports.createPatient = (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO patients (
      no_ktp, nama_lengkap, tempat_lahir, tanggal_lahir, umur, 
      jenis_kelamin, agama, status, golongan_darah, rhesus, 
      pendidikan, pekerjaan, no_telp, warga_negara, 
      nama_orangtua_wali, no_telp_wali, alamat, rt, rw, 
      kelurahan, kecamatan, kabupaten, provinsi, kode_pos, 
      asuransi, no_asuransi
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.noKtp,
    data.namaLengkap,
    data.tempatLahir,
    data.tanggalLahir,
    data.umur,
    data.jenisKelamin,
    data.agama,
    data.status,
    data.goldar,
    data.rhesus,
    data.pendidikan,
    data.pekerjaan,
    data.noTelp,
    data.wargaNegara,
    data.namaOrangtuaWali,
    data.noTelpWali,
    data.alamat,
    data.rt,
    data.rw,
    data.kelurahan,
    data.kecamatan,
    data.kabupaten,
    data.provinsi,
    data.kodePos,
    data.asuransi,
    data.noAsuransi
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Patient registered successfully', id: result.insertId });
  });
};

// Get all patients
exports.getPatients = (req, res) => {
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
};

// Delete a patient by no_ktp
exports.deletePatient = (req, res) => {
  const { no_ktp } = req.params;

  const sql = 'DELETE FROM patients WHERE no_ktp = ?';
  db.query(sql, [no_ktp], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete patient' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  });
};

// Update a patient's data by no_ktp
exports.updatePatient = (req, res) => {
  const { no_ktp } = req.params;
  const data = req.body;

  const sql = `
    UPDATE patients SET 
      nama_lengkap = ?, tempat_lahir = ?, tanggal_lahir = ?, umur = ?, 
      jenis_kelamin = ?, agama = ?, status = ?, golongan_darah = ?, 
      rhesus = ?, pendidikan = ?, pekerjaan = ?, no_telp = ?, 
      warga_negara = ?, nama_orangtua_wali = ?, no_telp_wali = ?, 
      alamat = ?, rt = ?, rw = ?, kelurahan = ?, kecamatan = ?, 
      kabupaten = ?, provinsi = ?, kode_pos = ?, asuransi = ?, 
      no_asuransi = ?
    WHERE no_ktp = ?
  `;

  const values = [
    data.nama_lengkap,
    data.tempat_lahir,
    data.tanggal_lahir,
    data.umur,
    data.jenis_kelamin,
    data.agama,
    data.status,
    data.golongan_darah,
    data.rhesus,
    data.pendidikan,
    data.pekerjaan,
    data.no_telp,
    data.warga_negara,
    data.nama_orangtua_wali,
    data.no_telp_wali,
    data.alamat,
    data.rt,
    data.rw,
    data.kelurahan,
    data.kecamatan,
    data.kabupaten,
    data.provinsi,
    data.kode_pos,
    data.asuransi,
    data.no_asuransi,
    no_ktp
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Failed to update patient' });
    }

    res.json({ message: 'Patient updated successfully' });
  });
};

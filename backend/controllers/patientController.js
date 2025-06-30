const db = require('../config/db');

// Create a new patient
// exports.createPatient = (req, res) => {
//   const data = req.body;

//   const sql = `
//     INSERT INTO pasien (
//       no_ktp, no_rme, nama_lengkap, tempat_lahir, tanggal_lahir, umur, 
//       jenis_kelamin, jenis_kelamin_id, agama, agama_id, status, status_nikah_id, 
//       golongan_darah, golongan_darah_id, rhesus, 
//       pendidikan, pendidikan_id, pekerjaan, no_telp, warga_negara, warga_negara_id, 
//       nama_orangtua_wali, no_telp_wali, alamat, rt, rw, 
//       kelurahan, kecamatan, kabupaten, provinsi, kode_pos, 
//       asuransi, asuransi_id, no_asuransi
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     data.noKtp,
//     data.noRme,
//     data.namaLengkap,
//     data.tempatLahir,
//     data.tanggalLahir,
//     data.umur,
//     data.jenisKelamin,
//     data.jenis_kelamin_id,
//     data.agama,
//     data.agama_id,
//     data.status,
//     data.status_nikah_id,
//     data.goldar,
//     data.golongan_darah_id,
//     data.rhesus,
//     data.pendidikan,
//     data.pendidikan_id,
//     data.pekerjaan,
//     data.noTelp,
//     data.wargaNegara,
//     data.warga_negara_id,
//     data.namaOrangtuaWali,
//     data.noTelpWali,
//     data.alamat,
//     data.rt,
//     data.rw,
//     data.kelurahan,
//     data.kecamatan,
//     data.kabupaten,
//     data.provinsi,
//     data.kodePos,
//     data.asuransi,
//     data.asuransi_id,
//     data.noAsuransi
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.status(201).json({ message: 'Patient registered successfully', id: result.insertId });
//   });
// };

exports.createPatient = (req, res) => {
  const data = req.body;
  if (!data.gender_id || !data.agama_id || !data.status_nikah_id || !data.golongan_darah_id || !data.pendidikan_id || !data.warga_negara_id || !data.asuransi_id) {
    return res.status(400).json({ error: 'All dropdown IDs are required and cannot be null.' });
  }

  // Prepare the JSON object for the procedure (only IDs, no duplicate fields)
  const pasienJson = {
    pasien_id: data.noRme || null,
    pasien_nik: data.noKtp || null,
    pasien_name: data.namaLengkap || null,
    pasien_birthplace: data.tempatLahir || null,
    pasien_dob: data.tanggalLahir || null,
    pasien_nomor_telepon: data.noTelp || null,
    pasien_name_wali: data.namaOrangtuaWali || null,
    pasien_nomor_telepon_wali: data.noTelpWali || null,
    pasien_nomor_asuransi: data.noAsuransi || null,
    gender_id: data.gender_id || null,
    agama_id: data.agama_id || null,
    status_nikah_id: data.status_nikah_id || null,
    golongan_darah_id: data.golongan_darah_id || null,
    pendidikan_id: data.pendidikan_id || null,
    pekerjaan_id: data.pekerjaan_id || null,
    warga_negara_id: data.warga_negara_id || null,
    alamat_detail: data.alamat || null,
    alamat_rt: data.rt || null,
    alamat_rw: data.rw || null,
    alamat_kode_pos: data.kodePos || null,
    alamat_kelurahan: data.kelurahan || null,
    alamat_kecamatan: data.kecamatan || null,
    alamat_kabupaten: data.kabupaten || null,
    alamat_provinsi: data.provinsi || null,
    asuransi_id: data.asuransi_id || null
  };

  const pasienJsonString = JSON.stringify(pasienJson);

  const sql = `CALL insert_pasien_json(?)`;

  db.query(sql, [pasienJsonString], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error', detail: err.message });
    }
    res.status(201).json({ message: 'Patient registered successfully' });
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

// Get the last RME number
exports.getLastRme = (req, res) => {
  const sql = 'SELECT no_rme FROM patients ORDER BY id DESC LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching last RME:', err);
      return res.status(500).json({ error: 'Failed to fetch last RME' });
    }
    const lastRme = results.length > 0 ? results[0].no_rme : 'RME-0';
    res.json({ lastRme });
  });
};

// Get gender options from lk_gender table
exports.getGenderOptions = (req, res) => {
  const sql = 'SELECT gender_id, gender_name FROM lk_gender';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching gender options:', err);
      return res.status(500).json({ error: 'Failed to fetch gender options' });
    }
    res.json(results);
  });
};

// Get agama options from lk_agama table
exports.getAgamaOptions = (req, res) => {
  const sql = 'SELECT agama_id, agama_name FROM lk_agama';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching agama options:', err);
      return res.status(500).json({ error: 'Failed to fetch agama options' });
    }
    res.json(results);
  });
};

// Get status nikah options from lk_status_nikah table
exports.getStatusNikahOptions = (req, res) => {
  const sql = 'SELECT status_nikah_id, status_nikah_name FROM lk_status_nikah';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching status nikah options:', err);
      return res.status(500).json({ error: 'Failed to fetch status nikah options' });
    }
    res.json(results);
  });
};

// Get golongan darah options from lk_golongan_darah table
exports.getGolonganDarahOptions = (req, res) => {
  const sql = 'SELECT golongan_darah_id, golongan_darah_name FROM lk_golongan_darah';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching golongan darah options:', err);
      return res.status(500).json({ error: 'Failed to fetch golongan darah options' });
    }
    res.json(results);
  });
};

// Get pendidikan options from lk_pendidikan table
exports.getPendidikanOptions = (req, res) => {
  const sql = 'SELECT pendidikan_id, pendidikan_name FROM lk_pendidikan';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching pendidikan options:', err);
      return res.status(500).json({ error: 'Failed to fetch pendidikan options' });
    }
    res.json(results);
  });
};

// Get warga negara options from lk_warga_negara table
exports.getWargaNegaraOptions = (req, res) => {
  const sql = 'SELECT warga_negara_id, warga_negara_name FROM lk_warga_negara';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching warga negara options:', err);
      return res.status(500).json({ error: 'Failed to fetch warga negara options' });
    }
    res.json(results);
  });
};

// Get asuransi options from lk_asuransi table
exports.getAsuransiOptions = (req, res) => {
  const sql = 'SELECT asuransi_id, asuransi_name FROM lk_asuransi';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching asuransi options:', err);
      return res.status(500).json({ error: 'Failed to fetch asuransi options' });
    }
    res.json(results);
  });
};

// Get pekerjaan options from lk_pekerjaan table
exports.getPekerjaanOptions = (req, res) => {
  const sql = 'SELECT pekerjaan_id, pekerjaan_name FROM lk_pekerjaan';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching pekerjaan options:', err);
      return res.status(500).json({ error: 'Failed to fetch pekerjaan options' });
    }
    res.json(results);
  });
};

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/api/patients', patientController.createPatient);
router.get('/api/patients', patientController.getPatients);
router.delete('/api/patients/:no_ktp', patientController.deletePatient);
router.put('/api/patients/:no_ktp', patientController.updatePatient);
router.get('/api/patients/last-rme', patientController.getLastRme);
router.get('/api/gender-options', patientController.getGenderOptions);
router.get('/api/agama-options', patientController.getAgamaOptions);
router.get('/api/status-nikah-options', patientController.getStatusNikahOptions);
router.get('/api/golongan-darah-options', patientController.getGolonganDarahOptions);
router.get('/api/pendidikan-options', patientController.getPendidikanOptions);
router.get('/api/warga-negara-options', patientController.getWargaNegaraOptions);
router.get('/api/asuransi-options', patientController.getAsuransiOptions);
router.get('/api/pekerjaan-options', patientController.getPekerjaanOptions);

module.exports = router;
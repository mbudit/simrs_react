const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/api/patients', patientController.createPatient);
router.get('/api/patients', patientController.getPatients);
router.delete('/api/patients/:no_ktp', patientController.deletePatient);
router.put('/api/patients/:no_ktp', patientController.updatePatient);
router.get('/api/patients/last-rme', patientController.getLastRme);

module.exports = router;
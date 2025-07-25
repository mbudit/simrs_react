const express = require('express');
const router = express.Router();
const rmeController = require('../controllers/rmeController');
const db = require('../config/db');

router.post('/api/rme/save-form', rmeController.saveFormData);
router.get('/api/rme/clinical-notes/:no_rme', rmeController.getClinicalNotes);
router.get('/api/rme/clinical-note/:id', rmeController.getClinicalNoteById);
router.delete('/api/rme/clinical-notes/:id', rmeController.deleteClinicalNote);
router.put('/api/rme/clinical-notes/:id', rmeController.updateClinicalNote);

module.exports = router;
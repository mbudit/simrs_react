const express = require('express');
const router = express.Router();
const rmeController = require('../controllers/rmeController');

router.post('/api/rme/save-form', rmeController.saveFormData); // Ensure this matches the frontend endpoint

module.exports = router;
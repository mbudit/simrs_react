const express = require('express');
const router = express.Router();
const ranapController = require('../controllers/ranapController');

router.post("/api/rawatinap", ranapController.createRanap);
router.get("/api/pasien_ranap", ranapController.getRanapPatients);

module.exports = router;
const express = require('express');
const router = express.Router();
const ranapController = require('../controllers/ranapController');

router.post("/api/rawatinap", ranapController.createRanap);
router.get("/api/pasien_ranap", ranapController.getRanapPatients);
router.put("/api/update_ranap/:id", ranapController.updateRanapPatient);
router.delete("/api/pasien_ranap/:id", ranapController.deleteRanapPatient);

module.exports = router;
const express = require('express');
const router = express.Router();
const rajalController = require('../controllers/rajalController');

router.post("/api/rawatjalan", rajalController.createRajal);
router.get("/api/pasien_rajal", rajalController.getRajalPatients);
router.delete("/api/pasien_rajal/:id", rajalController.deleteRajalPatient);
router.put("/api/update_rajal/:id", rajalController.updateRajalPatient);
router.put("/api/updateStatusRajal/:id", rajalController.updateStatusRajal);

module.exports = router;
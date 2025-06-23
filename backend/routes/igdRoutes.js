const express = require('express');
const router = express.Router();
const igdController = require('../controllers/igdController');

router.post("/api/igd", igdController.createIgd);
router.get("/api/pasien_igd", igdController.getIgdPatients);
router.delete("/api/pasien_igd/:id", igdController.deleteIgdPatient);
router.put("/api/update_igd/:id", igdController.updateIgdPatient);
router.put("/api/updateStatusIGD/:id", igdController.updateStatusIgd);

module.exports = router;
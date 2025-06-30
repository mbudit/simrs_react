const express = require('express');
const router = express.Router();
const datamasterController = require('../controllers/datamasterController');

////// Controller for Tarif Pelayanan Rawat Jalan //////
router.post("/api/tarif_pelayanan_rajal", datamasterController.createLayananRajal);
router.get("/api/getLayananRajal", datamasterController.getLayananRajal);
router.delete("/api/deleteLayananRajal/:id", datamasterController.deleteLayananRajal);
router.put("/api/updateLayananRajal/:id", datamasterController.updateLayananRajal);

////// Controller for Tarif Pelayanan Rawat Inap //////
router.post("/api/tarif_pelayanan_ranap", datamasterController.createLayananRanap);
router.get("/api/getLayananRanap", datamasterController.getLayananRanap);
router.delete("/api/deleteLayananRanap/:id", datamasterController.deleteLayananRanap);
router.put("/api/updateLayananRanap/:id", datamasterController.updateLayananRanap);

////// Controller for Tarif Pelayanan Rawat Inap //////
router.post("/api/tarif_pelayanan_igd", datamasterController.createLayananIGD);
router.get("/api/getLayananIGD", datamasterController.getLayananIGD);
router.delete("/api/deleteLayananIGD/:id", datamasterController.deleteLayananIGD);
router.put("/api/updateLayananIGD/:id", datamasterController.updateLayananIGD);

module.exports = router;
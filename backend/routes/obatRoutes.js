const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');

router.post("/api/tambahObat", obatController.createObat);
router.get("/api/getObat", obatController.getObat);
router.put("/api/updateObat/:id", obatController.updateObat);
router.delete("/api/deleteObat/:id", obatController.deleteObat);

module.exports = router;
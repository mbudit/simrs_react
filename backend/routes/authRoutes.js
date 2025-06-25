const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/updateUser", authController.updateUser);
router.post("/auth/logout", authController.logout);
router.get("/auth/check", authController.checkAuth);
router.post("/decode-token", authController.decodeToken);

module.exports = router;
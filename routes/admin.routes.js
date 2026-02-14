const express = require("express");
const router = express.Router();
const adminController = (require('../controllers/admin.controller'))
const verifyToken = require("../middlewares/verifyToken");
const {verifyAdmin} = require("../middlewares/verifyAdmin");

router.get('/admin-stats', verifyToken, verifyAdmin, adminController.getAdminStats);

module.exports = router;
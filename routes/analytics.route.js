const express = require('express');
const router = express.Router();
const { getSmartInsights } = require('../controllers/analytics.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/insights', verifyToken, getSmartInsights);

module.exports = router;
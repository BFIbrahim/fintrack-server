const express = require('express');
const router = express.Router();
const { getSmartInsights, getDashboardSummary } = require('../controllers/analytics.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/insights', verifyToken, getSmartInsights);
router.get('/dashboard-summary', verifyToken, getDashboardSummary);

module.exports = router;
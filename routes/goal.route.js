const express = require('express');
const router = express.Router();
const { 
    getGoals, 
    createGoal, 
    addContribution,
    deleteGoal
} = require('../controllers/goal.controller');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.get('/goals', getGoals);
router.post('/goals', createGoal);
router.patch('/goals/:id/contribute', addContribution);
router.delete('/goals/:id', deleteGoal);

module.exports = router;
const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction, updateTransaction } = require('../controllers/transaction.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/transactions', verifyToken, getTransactions);
router.post('/transactions', verifyToken, addTransaction);
router.delete('/transactions/:id', verifyToken, deleteTransaction);
router.patch("/transactions/:id", verifyToken, updateTransaction);

module.exports = router;
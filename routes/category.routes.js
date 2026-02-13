const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, deleteCategory } = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken')
const {verifyAdmin} = require('../middlewares/verifyAdmin')

router.get('/categories', verifyToken, getAllCategories);
router.post('/categories', verifyToken, verifyAdmin, createCategory);
router.delete('/categories/:id', verifyToken, verifyAdmin,  deleteCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, deleteCategory } = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken')
// Import your existing middlewares
// const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Public/User Routes (To see categories)
router.get('/categories', verifyToken, getAllCategories);

// Admin Only Routes
router.post('/categories', verifyToken, createCategory); // Add verifyToken and verifyAdmin here
router.delete('/categories/:id', verifyToken, deleteCategory); // Add verifyToken and verifyAdmin here

module.exports = router;
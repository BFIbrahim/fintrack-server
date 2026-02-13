const Category = require('../models/Category.model');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, type } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategory = new Category({ name, type });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get all categories (accessible by users to fill dropdowns)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
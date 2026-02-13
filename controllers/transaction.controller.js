const Transaction = require('../models/Transaction.model');

exports.addTransaction = async (req, res) => {
    try {
        const { amount, type, category, note, date } = req.body;

        const newTransaction = new Transaction({
            userId: req.user.id,
            amount,
            type,
            category,
            note,
            date
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: "Failed to save", error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { search, type, category } = req.query;
        let query = { userId: req.user.id };

        if (search) {
            query.$or = [
                { note: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ];
        }

        if (type && type !== "all") query.type = type;
        if (category && category !== "all") query.category = category;

        const transactions = await Transaction.find(query).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!transaction) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
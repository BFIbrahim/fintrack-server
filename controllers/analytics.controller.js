const mongoose = require('mongoose');
const Transaction = require("../models/Transaction.model");
const Goal = require("../models/Goal.model");

exports.getSmartInsights = async (req, res) => {
    try {
        const userIdRaw = req.user?._id || req.user?.id || req.user?.userId;

        if (!userIdRaw) {
            console.error("Auth Error: No ID found in token decoded object:", req.user);
            return res.status(401).json({ message: "User identity not found in token" });
        }

        const userId = new mongoose.Types.ObjectId(userIdRaw);

        const categoryData = await Transaction.aggregate([
            { $match: { userId: userId, type: 'expense' } },
            { $group: { _id: "$category", value: { $sum: "$amount" } } },
            { $sort: { value: -1 } }
        ]);

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const ratioData = await Transaction.aggregate([
            { $match: { userId: userId, date: { $gte: startOfMonth } } },
            { $group: { _id: "$type", total: { $sum: "$amount" } } }
        ]);

        const goals = await Goal.find({ userId: userId });
        const totalTarget = goals.reduce((acc, g) => acc + (Number(g.targetAmount) || 0), 0);
        const totalSaved = goals.reduce((acc, g) => acc + (Number(g.currentAmount) || 0), 0);

        const insights = [];
        const income = ratioData.find(d => d._id === 'income')?.total || 0;
        const expense = ratioData.find(d => d._id === 'expense')?.total || 0;

        if (income > 0) {
            const percent = ((expense / income) * 100).toFixed(0);
            insights.push(`You have spent ${percent}% of your income this month.`);
        }
        
        if (categoryData.length > 0) {
            insights.push(`Your top spending category is ${categoryData[0]._id}.`);
        }

        if (totalTarget > 0 && totalSaved >= totalTarget) {
            insights.push("Congratulations! You've reached your total savings goal!");
        }

        res.status(200).json({
            categoryData: categoryData || [],
            ratio: { income, expense },
            savings: { totalTarget, totalSaved },
            insights: insights.length > 0 ? insights : ["Add transactions to see personalized tips!"]
        });

    } catch (error) {
        console.error("CRASH ERROR:", error); 
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
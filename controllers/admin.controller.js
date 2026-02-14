const User = require("../models/User.model");
const Transaction = require("../models/Transaction.model");

exports.getAdminStats = async (req, res) => {
    try {
        // 1. System-wide Totals
        const totalUsers = await User.countDocuments();
        const totalTransactions = await Transaction.countDocuments();
        
        // 2. Financial Volume (Sum of all transactions in system)
        const volumeData = await Transaction.aggregate([
            { $group: { _id: null, totalVolume: { $sum: "$amount" } } }
        ]);

        // 3. User Growth (Last 5 users)
        const recentUsers = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(5);

        // 4. Role Distribution
        const adminCount = await User.countDocuments({ role: "admin" });
        const memberCount = totalUsers - adminCount;

        res.status(200).json({
            stats: {
                totalUsers,
                totalTransactions,
                totalVolume: volumeData[0]?.totalVolume || 0,
                adminCount,
                memberCount
            },
            recentUsers
        });
    } catch (error) {
        res.status(500).json({ message: "Admin stats failed", error: error.message });
    }
};
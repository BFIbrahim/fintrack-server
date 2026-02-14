const User = require("../models/User.model");

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to load users" });
    }
};

exports.makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id, 
            { role: "admin" }, 
            { new: true }
        );
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.status(200).json({ message: "Admin created", user });
    } catch (error) {
        res.status(500).json({ message: "Failed to make admin" });
    }
};
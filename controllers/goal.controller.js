const Goal = require('../models/Goal.model');

exports.getGoals = async (req, res) => {
    const goals = await Goal.find({ userId: req.user.id }).sort({ deadline: 1 });
    res.json(goals);
};

exports.createGoal = async (req, res) => {
    const newGoal = new Goal({ ...req.body, userId: req.user.id });
    await newGoal.save();
    res.status(201).json(newGoal);
};

exports.addContribution = async (req, res) => {
    const { amount } = req.body;
    const goal = await Goal.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { $inc: { currentAmount: amount } },
        { new: true }
    );
    res.json(goal);
};

exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.user.id 
        });
        
        if (!goal) return res.status(404).json({ message: "Goal not found" });
        
        res.json({ message: "Goal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
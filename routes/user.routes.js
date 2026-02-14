const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const {verifyAdmin} = require("../middlewares/verifyAdmin");

router.get("/users/me", verifyToken, userController.getMe);

router.get("/users", verifyToken, verifyAdmin, userController.getAllUsers);
router.patch("/users/admin/:id", verifyToken, verifyAdmin, userController.makeAdmin);

module.exports = router;
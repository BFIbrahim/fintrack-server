const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/users/me", verifyToken, userController.getMe);

module.exports = router;
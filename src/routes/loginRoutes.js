const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

// Login Endpoint
router.post("/", loginController.loginAdmin);

module.exports = router;

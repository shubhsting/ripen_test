const express = require("express");
const register = require("../controllers/registerController");
const router = express.Router();
const { validateRegisterData } = require("../middleware/validation");
router.post("/", validateRegisterData, register);

module.exports = router;

const express = require("express");
const register = require("../controllers/registerController");
const { updateUserEvent } = require("../controllers/userController");
const router = express.Router();
const { validateRegisterData } = require("../middleware/validation");
router.post("/", validateRegisterData, register);
router.post("/user-event", updateUserEvent);
module.exports = router;

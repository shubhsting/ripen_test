const express = require("express");
const { verifyOTP, sendOTP, resendOTP } = require("../controllers/userController");
const validateRouter = express.Router();

validateRouter.post("/verify", verifyOTP);
validateRouter.post("/send", sendOTP);
validateRouter.post("/resend", resendOTP);

module.exports = validateRouter;

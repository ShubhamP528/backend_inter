const express = require("express");
const router = express.Router();
const { createPerson, OtpVerification } = require("../controller/person");

router.post("/submit-details", createPerson);
router.post("/verify-otp", OtpVerification);

module.exports = router;

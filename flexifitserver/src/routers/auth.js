const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");

router.put("/register", validateRegistrationData, checkErrors, register);
router.post("/login", validateLoginData, checkErrors, login);
router.post("/logout", logout);

module.exports = router;

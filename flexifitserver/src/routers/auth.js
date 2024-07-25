const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const checkErrorsLogin = require("../validators/checkErrorsLogin");
const { auth } = require("../middleware/auth");

router.put("/register", validateRegistrationData, checkErrorsLogin, register);
router.post("/login", validateLoginData, checkErrorsLogin, login);
router.post("/logout", logout);

module.exports = router;

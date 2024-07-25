const { body } = require("express-validator");

const validateRegistrationData = [
  body("password", "password is required").notEmpty(),
  body(
    "password",
    "password length min is 8 and max is 50 characters"
  ).isLength({ min: 8, max: 50 }),
  body("name", "name is required").notEmpty(),
  body("contact", "contact is required").notEmpty(),
  body("email", "valid email is required").notEmpty().isEmail(),
];

const validateLoginData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty(),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
};

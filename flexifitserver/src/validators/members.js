const { body } = require("express-validator");

const validateCreateMember = [
  body("name", "Name is required and must be between 1 and 20 characters long")
    .notEmpty()
    .isLength({ min: 1, max: 20 }),
  body("contact", "Contact must be a string up to 20 characters long")
    .optional()
    .isLength({ max: 20 }),
  body("email", "Valid email is required").notEmpty().isEmail(),
  body("password_hash", "Password hash is required").notEmpty().isString(),
];

const validateUpdateMember = [
  body("id", "ID must be an integer").isInt(),
  body("name", "Name must be between 1 and 20 characters long")
    .optional()
    .isLength({ min: 1, max: 20 }),
  body("contact", "Contact must be a string up to 20 characters long")
    .optional()
    .isLength({ max: 20 }),
  body("email", "Valid email format is required").optional().isEmail(),
  body("password_hash", "Password hash must be a non-empty string")
    .optional()
    .isString()
    .notEmpty(),
];

const validateDeleteMember = [body("id", "ID must be an integer").isInt()];

const validategetMemberById = [body("id", "ID must be an integer").isInt()];

module.exports = {
  validateCreateMember,
  validateUpdateMember,
  validateDeleteMember,
  validategetMemberById,
};

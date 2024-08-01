const { body } = require("express-validator");

const isValidTime = (value) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:mm format
  return timeRegex.test(value) || value === "";
};

const validateCreateClass = [
  body("name", "Class name is required")
    .notEmpty()
    .isString()
    .isLength({ max: 20 }),
  body("description", "Description must be a string").optional().isString(),
  body("date", "Date must be a valid date").optional().isDate(),
  body("time", "Time must be a valid time").optional().custom(isValidTime),
  body("location", "Location must be a string")
    .optional()
    .isString()
    .isLength({ max: 100 }),
  body("instructor", "Instructor name must be a string")
    .optional()
    .isString()
    .isLength({ max: 20 }),
  body("session_duration", "Session duration must be a number")
    .optional()
    .isInt({ min: 0 }),
  body("class_size", "Class size must be a number")
    .optional()
    .isInt({ min: 0 }),
  body("fitness_studio_id", "Fitness studio ID must be an integer")
    .optional()
    .isInt(),
];

const validateUpdateClass = [
  body("id", "Class ID is required").notEmpty().isInt(),
  body("name", "Class name is required")
    .notEmpty()
    .isString()
    .isLength({ max: 20 }),
  body("description", "Description must be a string").optional().isString(),
  body("date", "Date must be a valid date").optional().isDate(),
  body("time", "Time must be a valid time").optional().custom(isValidTime),
  body("location", "Location must be a string")
    .optional()
    .isString()
    .isLength({ max: 100 }),
  body("instructor", "Instructor name must be a string")
    .optional()
    .isString()
    .isLength({ max: 20 }),
  body("session_duration", "Session duration must be a number")
    .optional()
    .isInt({ min: 0 }),
  body("class_size", "Class size must be a number")
    .optional()
    .isInt({ min: 0 }),
  body("fitness_studio_id", "Fitness studio ID must be an integer")
    .optional()
    .isInt(),
];

const validateGetClassById = [
  body("id", "Class ID is required").notEmpty().isInt(),
];

const validateDeleteClass = [
  body("id", "Class ID is required").notEmpty().isInt(),
];

const validateGetClassByLocation = [
  body("location", "Location must be a string").notEmpty().isString(),
];

module.exports = {
  validateCreateClass,
  validateUpdateClass,
  validateGetClassById,
  validateGetClassByLocation,
  validateDeleteClass,
};

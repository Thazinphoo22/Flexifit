const { body } = require("express-validator");

const validateIdInBody = [body("id", "id is required in body").notEmpty()];

const validateGetAllClasses = [
  body("name", "name is required").notEmpty(),
  body("description", "description is required").notEmpty(),
  body("date", "date is required").notEmpty().isDate(),
  body("time", "time is required").notEmpty(),
  isTime(),
  body("location", "location is required").notEmpty(),
  body("instructor", "instructor is required").notEmpty(),
  body("session_duration", "session_ is required").notEmpty(),

  class_size,
  fitness_studio_id,
];

const validateCreateJobData = [
  body("position", "position is required").notEmpty(),
  body("position", "must have a length between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("description", "description is required").notEmpty(),
  body(
    "description",
    "description must have a length between 1 and 2000 characters"
  ).isLength({
    min: 1,
    max: 2000,
  }),
  body("employer", "id is required").isMongoId(),
];

const validateUpdateJobData = [
  body("id", "id is required").notEmpty().isMongoId(),
  body("position", "position is required").optional().notEmpty(),
  body("description", "must have a length between 1 and 2000 characters")
    .optional()
    .isLength({
      min: 1,
      max: 2000,
    }),
];

const validatePostEmployerData = [
  body("name", "name is required").notEmpty(),
  body("description", "description is required").notEmpty(),
  body(
    "description",
    "description must have a lenght between 1 and 2000 characters"
  ),
  body("logo", "logo is required").optional().notEmpty(),
  body("email", "email is required").isEmail(),
];

module.exports = {
  validateIdInBody,
  validateIdInParam,
  validateGetEmployer,
  validateCreateJobData,
  validateUpdateJobData,
  validatePostEmployerData,
};

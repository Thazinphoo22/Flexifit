const { body } = require("express-validator");

const validateCreateBooking = [
  body("member_id", "Member ID is required").notEmpty().isInt(),
  body("class_id", "Class ID is required").notEmpty().isInt(),
];

const validateUpdateBooking = [
  body("id", "Booking ID is required").notEmpty().isInt(),
  body("member_id", "Member ID is required").notEmpty().isInt(),
  body("class_id", "Class ID is required").notEmpty().isInt(),
  body("status").optional().isString().isIn(["Booked"]),
];

const validateDeleteBooking = [
  body("id", "Booking ID is required").notEmpty().isInt(),
];

const validateGetBookingById = [
  body("id", "Booking ID is required").notEmpty().isInt(),
];

module.exports = {
  validateCreateBooking,
  validateUpdateBooking,
  validateDeleteBooking,
  validateGetBookingById,
};

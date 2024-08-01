const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");
const {
  validateCreateBooking,
  validateGetBookingById,
  validateUpdateBooking,
  validateDeleteBooking,
} = require("../validators/bookings");
const checkErrors = require("../validators/checkErrors");
const { auth, memberAuth } = require("../middleware/auth");

router.get("/bookings", auth, getBookings);
router.get(
  "/bookings/:id",
  auth,
  validateGetBookingById,
  checkErrors,
  getBookingById
);
router.put(
  "/bookings",
  memberAuth,
  validateCreateBooking,
  checkErrors,
  createBooking
);
router.patch(
  "/bookings",
  memberAuth,
  validateUpdateBooking,
  checkErrors,
  updateBooking
);
router.delete(
  "/bookings",
  memberAuth,
  validateDeleteBooking,
  checkErrors,
  deleteBooking
);

module.exports = router;

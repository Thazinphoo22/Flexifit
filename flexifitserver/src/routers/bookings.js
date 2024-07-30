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
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const { auth, memberAuth } = require("../middleware/auth");

router.get("/bookings", auth, getBookings);
router.get("/bookings/:id", auth, getBookingById);
router.put("/bookings", memberAuth, createBooking);
router.patch("/bookings", memberAuth, updateBooking);
router.delete("/bookings", memberAuth, deleteBooking);

module.exports = router;

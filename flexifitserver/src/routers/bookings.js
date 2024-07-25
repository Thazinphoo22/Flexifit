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

router.get("/", auth, getBookings);
router.get("/:id", auth, getBookingById);
router.put("/", memberAuth, createBooking);
router.patch("/", memberAuth, updateBooking);
router.delete("/", memberAuth, deleteBooking);

module.exports = router;

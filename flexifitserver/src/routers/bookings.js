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
const checkErrors = require("../validators/checkErrors");
const { auth, memberAuth } = require("../middleware/auth");

router.get("/", getBookings);
router.get("/:id", getBookingById);
router.put("/", createBooking);
router.patch("/", updateBooking);
router.delete("/", deleteBooking);

module.exports = router;

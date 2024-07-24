const { pool } = require("../db/db");

const getBookings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBookingById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBooking = async (req, res) => {
  const { member_id, class_id, book_date, status } = req.body;
  try {
    await pool.query(
      "INSERT INTO bookings (member_id, class_id, book_date, status) VALUES ($1, $2, $3, $4)",
      [member_id, class_id, book_date, status]
    );
    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.body;
  const { member_id, class_id, book_date, status } = req.body;
  try {
    await pool.query(
      "UPDATE bookings SET member_id = $1, class_id = $2, book_date = $3, status = $4 WHERE id = $5",
      [member_id, class_id, book_date, status, id]
    );
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};

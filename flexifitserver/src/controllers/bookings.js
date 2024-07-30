const { pool } = require("../db/db");

const getBookings = async (req, res) => {
  try {
    const result = await pool.query(`
    SELECT
      b.id,
      m.name AS member_name,
      c.name AS class_name,
      c.date AS class_date,
      c.time AS class_time,
      c.location AS class_location,
      c.instructor AS class_instructor,
      c.session_duration AS class_session_duration,
      c.class_size AS class_class_size,
      b.status
    FROM
      bookings b
      INNER JOIN members m ON b.member_id = m.id
      INNER JOIN classes c ON b.class_id = c.id
  `);
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
  const { member_id, class_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO bookings ( member_id, class_id) VALUES ($1, $2)",
      [member_id, class_id]
    );
    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBooking = async (req, res) => {
  const { id, member_id, class_id, status } = req.body;
  try {
    await pool.query(
      "UPDATE bookings SET member_id = $1, class_id = $2, status = $3 WHERE id = $4",
      [member_id, class_id, status, id]
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

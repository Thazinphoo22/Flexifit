const { pool } = require("../db/db");

const createClass = async (req, res) => {
  const {
    id,
    name,
    description,
    date,
    time,
    location,
    instructor,
    session_duration,
    class_size,
  } = req.body;
  try {
    await pool.query(
      "INSERT INTO class (id, name, description, date, time, location, instructor, session_duration, class_size) VALUES ($2, $3, $4, $5, $6, $7, $8, $9)",
      [
        id,
        name,
        description,
        date,
        time,
        location,
        instructor,
        session_duration,
        class_size,
      ]
    );
    res.status(201).json({ message: "Class created" });
  } catch (error) {
    res.status(500).json({ error: "Error creating class" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM classes");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving class" });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query("SELECT * FROM class WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving class by id" });
  }
};

const updateClass = async (req, res) => {
  const { id } = req.body;
  const {
    name,
    description,
    date,
    time,
    location,
    instructor,
    session_duration,
    class_size,
  } = req.body;
  try {
    await pool.query(
      "UPDATE class SET id = $1, name = $2, description = $3, date = $4, time = $5, location = $6, instructor = $7, session_duration = $8, class_size = $9",
      [
        id,
        name,
        description,
        date,
        time,
        location,
        instructor,
        session_duration,
        class_size,
      ]
    );
    res.json({ message: "Class updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating class" });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query("DELETE FROM class WHERE id = $1", [id]);
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting class" });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};

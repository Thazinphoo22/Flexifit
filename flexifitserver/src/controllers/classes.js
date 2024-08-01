const { pool } = require("../db/db");

const createClass = async (req, res) => {
  const {
    name,
    description,
    date,
    time,
    location,
    instructor,
    session_duration,
    class_size,
    fitness_studio_id,
  } = req.body;
  try {
    await pool.query(
      "INSERT INTO classes (name, description, date, time, location, instructor, session_duration, class_size, fitness_studio_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        name,
        description,
        date,
        time,
        location,
        instructor,
        session_duration,
        class_size,
        fitness_studio_id,
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
    const result = await pool.query("SELECT * FROM classes WHERE id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving class by id" });
  }
};

const getClassByLocation = async (req, res) => {
  const { location } = req.body;
  //   console.log(1);
  try {
    const result = await pool.query(
      "SELECT * FROM classes WHERE location ILIKE $1",
      [`%${location}%`]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving classes by location" });
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
    fitness_studio_id,
  } = req.body;
  try {
    await pool.query(
      "UPDATE classes SET name = $1, description = $2, date = $3, time = $4, location = $5, instructor = $6, session_duration = $7, class_size = $8, fitness_studio_id = $9  where id =$10",
      [
        name,
        description,
        date,
        time,
        location,
        instructor,
        session_duration,
        class_size,
        fitness_studio_id,
        id,
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
    await pool.query("DELETE FROM classes WHERE id = $1 ", [id]);
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting class" });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  getClassByLocation,
  updateClass,
  deleteClass,
};

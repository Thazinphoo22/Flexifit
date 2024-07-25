const { pool } = require("../db/db");

const getFitnessStudios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fitness_studios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFitnessStudioById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM fitness_studios WHERE id = $1",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFitnessStudio = async (req, res) => {
  const { id, name, contact, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      "UPDATE fitness_studios SET  name = $1, contact = $2, email = $3, password_hash = $4 WHERE id = $5 RETURNING *",
      [name, contact, email, password_hash, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createFitnessStudio = async (req, res) => {
  const { name, contact, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO fitness_studios (name, contact, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, contact, email, password_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFitnessStudio = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM fitness_studios WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getFitnessStudios,
  getFitnessStudioById,
  updateFitnessStudio,
  createFitnessStudio,
  deleteFitnessStudio,
};

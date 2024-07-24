const { pool } = require("../db");

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

module.exports = { getFitnessStudios, getFitnessStudioById };

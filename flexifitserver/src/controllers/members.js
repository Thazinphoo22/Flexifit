const { pool } = require("../db");

const getMembers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM members");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMemberById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query("SELECT * FROM members WHERE id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMembers, getMemberById };

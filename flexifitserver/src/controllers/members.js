const { pool } = require("../db/db");

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

const createMember = async (req, res) => {
  const { name, contact, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO members (name, contact, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, contact, email, password_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// const createMember = async (req, res) => {
//   const { name, contact, email, password_hash } = req.body;
//   try {
//     const result = await pool.query(
//       "INSERT INTO members (name, contact, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
//       [name, contact, email, password_hash]
//     );
//     const memberId = result.rows[0].id; // get the id of the newly created member
//     res.status(201).json({ memberId, ...result.rows[0] }); // return the memberId along with the rest of the data
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const updateMember = async (req, res) => {
  const { id, name, contact, email, password_hash } = req.body;
  try {
    const result = await pool.query(
      "UPDATE members SET  name = $1, contact = $2, email = $3, password_hash = $4 WHERE id = $5 RETURNING *",
      [name, contact, email, password_hash, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM members WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMembers,
  getMemberById,
  updateMember,
  createMember,
  deleteMember,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { name, contact, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 8);
  let query, values;
  if (role === "member") {
    query = `INSERT INTO members (name, contact, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *`;
    values = [name, contact, email, passwordHash];
  } else if (role === "fitness_studio") {
    query = `INSERT INTO fitness_studios (name, contact, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *`;
    values = [name, contact, email, passwordHash];
  } else {
    return res.status(400).send({ message: "Invalid role" });
  }
  try {
    console.log("Executing query:", query);
    const result = await pool.query(query, values);
    const newUser = result.rows[0];
    res
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  const { role, email, password } = req.body;

  try {
    let query = "";
    if (role === "member") {
      query = "SELECT * FROM members WHERE email = $1";
    } else if (role === "fitness_studio") {
      query = "SELECT * FROM fitness_studios WHERE email = $1";
    } else {
      return res.status(400).send({ message: "Invalid roles" });
    }

    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const claims = {
      email: user.email,
      role: role,
      id: user.id,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res
      .status(200)
      .send({ message: "User logged in successfully", access, refresh });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error logging in user", error: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: "Logged out" });
};

module.exports = { register, login, logout };

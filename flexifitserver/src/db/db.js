require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

module.exports = { pool };
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE);
//     console.log("DB connected");
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

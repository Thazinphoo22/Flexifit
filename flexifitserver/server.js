require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fitnessStudios = require("./src/routers/fitnessStudios");
const members = require("./src/routers/members");
const classes = require("./src/routers/classes");
const bookings = require("./src/routers/bookings");
const auth = require("./src/routers/auth");
// const connectDB = require("./src/db/db");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 1000, // limit each IP to 1000 requests per windowMs
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// connectDB();

const app = express();

app.use(cors());
app.use(helmet());
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", fitnessStudios);
app.use("/api", members);
app.use("/api", classes);
app.use("/api", bookings);
app.use("/auth", auth);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

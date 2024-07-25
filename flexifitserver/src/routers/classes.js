const express = require("express");
const router = express.Router();
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} = require("../controllers/classes");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");
const { auth, fitness_studioAuth } = require("../middleware/auth");

router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.put("/", createClass);
router.patch("/", updateClass);
router.delete("/", deleteClass);

module.exports = router;

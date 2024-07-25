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
const { auth, fitness_studioAuth } = require("../middleware/auth");

router.get("/", auth, getAllClasses);
router.get("/:id", auth, getClassById);
router.put("/", fitness_studioAuth, createClass);
router.patch("/", fitness_studioAuth, updateClass);
router.delete("/", fitness_studioAuth, deleteClass);

module.exports = router;

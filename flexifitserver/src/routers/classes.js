const express = require("express");
const router = express.Router();
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getClassByLocation,
} = require("../controllers/classes");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const { auth, fitness_studioAuth } = require("../middleware/auth");

router.get("/classes", auth, getAllClasses);
router.get("/classes/:id", auth, getClassById);
router.post("/classes/location", getClassByLocation);
// router.post("/classes/location", (req, res) => res.json({ msg: "return" }));
router.put("/classes", fitness_studioAuth, createClass);
router.patch("/classes", fitness_studioAuth, updateClass);
router.delete("/classes", fitness_studioAuth, deleteClass);

module.exports = router;

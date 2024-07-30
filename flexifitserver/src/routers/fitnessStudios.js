const express = require("express");
const router = express.Router();
const {
  getFitnessStudios,
  getFitnessStudioById,
  updateFitnessStudio,
  createFitnessStudio,
  deleteFitnessStudio,
} = require("../controllers/fitnessStudios");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const { auth } = require("../middleware/auth");

router.get("/fitness_studios", auth, getFitnessStudios);
router.get("/fitness_studios/:id", auth, getFitnessStudioById);
router.put("/fitness_studios", auth, createFitnessStudio);
router.patch("/fitness_studios", auth, updateFitnessStudio);
router.delete("/fitness_studios", auth, deleteFitnessStudio);

module.exports = router;

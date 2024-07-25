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
const checkErrors = require("../validators/checkErrors");
const { auth, fitness_studioAuth } = require("../middleware/auth");

router.get("/", getFitnessStudios);
router.get("/:id", getFitnessStudioById);
router.put("/", createFitnessStudio);
router.patch("/", updateFitnessStudio);
router.delete("/", deleteFitnessStudio);

module.exports = router;

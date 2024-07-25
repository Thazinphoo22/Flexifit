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

router.get("/", auth, getFitnessStudios);
router.get("/:id", auth, getFitnessStudioById);
router.put("/", auth, createFitnessStudio);
router.patch("/", auth, updateFitnessStudio);
router.delete("/", auth, deleteFitnessStudio);

module.exports = router;

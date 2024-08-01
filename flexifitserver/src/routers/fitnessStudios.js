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
  validateCreateFitnessStudio,
  validateDeleteFitnessStudio,
  validateUpdateFitnessStudio,
  validategetFitnessStudioById,
} = require("../validators/fitnessStudios");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");

router.get("/fitness_studios", auth, getFitnessStudios);
router.get(
  "/fitness_studios/:id",
  auth,
  validategetFitnessStudioById,
  checkErrors,
  getFitnessStudioById
);
router.put(
  "/fitness_studios",
  auth,
  validateCreateFitnessStudio,
  checkErrors,
  createFitnessStudio
);
router.patch(
  "/fitness_studios",
  auth,
  validateUpdateFitnessStudio,
  checkErrors,
  updateFitnessStudio
);
router.delete(
  "/fitness_studios",
  auth,
  validateDeleteFitnessStudio,
  checkErrors,
  deleteFitnessStudio
);

module.exports = router;

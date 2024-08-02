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
  validateCreateClass,
  validateGetClassById,
  validateUpdateClass,
  validateGetClassByLocation,
  validateDeleteClass,
} = require("../validators/classes");
const checkErrors = require("../validators/checkErrors");
const { auth, fitness_studioAuth } = require("../middleware/auth");

router.get("/classes", auth, getAllClasses);
router.get(
  "/classes/:id",
  auth,
  validateGetClassById,
  checkErrors,
  getClassById
);
router.post(
  "/classes/location",
  auth,
  validateGetClassByLocation,
  checkErrors,
  getClassByLocation
);
// router.post("/classes/location", (req, res) => res.json({ msg: "return" }));
router.put(
  "/classes",
  fitness_studioAuth,
  validateCreateClass,
  checkErrors,
  createClass
);
router.patch("/classes", fitness_studioAuth, validateUpdateClass, updateClass);
router.delete(
  "/classes",
  fitness_studioAuth,
  validateDeleteClass,
  checkErrors,
  deleteClass
);

module.exports = router;

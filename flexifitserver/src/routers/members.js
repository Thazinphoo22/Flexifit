const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMemberById,
  updateMember,
  createMember,
  deleteMember,
} = require("../controllers/members");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");
const { auth, fitness_studioAuth } = require("../middleware/auth");

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.put("/", createMember);
router.patch("/", updateMember);
router.delete("/", deleteMember);

module.exports = router;

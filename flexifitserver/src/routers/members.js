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
const { auth } = require("../middleware/auth");

router.get("/", auth, getMembers);
router.get("/:id", auth, getMemberById);
router.put("/", auth, createMember);
router.patch("/", auth, updateMember);
router.delete("/", auth, deleteMember);

module.exports = router;

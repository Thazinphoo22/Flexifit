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

router.get("/members", auth, getMembers);
router.get("/members/:id", auth, getMemberById);
router.put("/members", auth, createMember);
router.patch("/members", auth, updateMember);
router.delete("/members", auth, deleteMember);

module.exports = router;

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
  validateCreateMember,
  validateUpdateMember,
  validateDeleteMember,
  validategetMemberById,
} = require("../validators/members");
const checkErrors = require("../validators/checkErrors");
const { auth } = require("../middleware/auth");

router.get("/members", auth, getMembers);
router.get(
  "/members/:id",
  auth,
  validategetMemberById,
  checkErrors,
  getMemberById
);
router.put("/members", auth, validateCreateMember, checkErrors, createMember);
router.patch("/members", auth, validateUpdateMember, checkErrors, updateMember);
router.delete(
  "/members",
  auth,
  validateDeleteMember,
  checkErrors,
  deleteMember
);

module.exports = router;

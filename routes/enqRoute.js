const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} = require("../controller/enqCtrl");
const { authMiddleWare, isAdmin } = require("../middlewears/authMiddelware");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleWare, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleWare, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getallEnquiry);

module.exports = router;
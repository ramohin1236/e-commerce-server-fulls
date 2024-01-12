const express = require("express");
const { authMiddleWare, isAdmin } = require('../middlewears/authMiddelware');
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorCtrl");

const router = express.Router();

router.post("/", authMiddleWare, isAdmin, createColor);
router.put("/:id", authMiddleWare, isAdmin, updateColor);
router.delete("/:id", authMiddleWare, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;
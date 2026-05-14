const express = require("express");
const router = express.Router();
const {
  getRule,
  tambahRule,
  hapusRule,
} = require("../controllers/ruleController");

router.get("/", getRule);
router.post("/", tambahRule);
router.delete("/:id", hapusRule);

module.exports = router;

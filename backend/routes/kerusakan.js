const express = require("express");
const router = express.Router();

const {
  getKerusakan,
  tambahKerusakan,
  updateKerusakan,
  hapusKerusakan,
} = require("../controllers/kerusakanController");

// GET
router.get("/", getKerusakan);

// POST
router.post("/", tambahKerusakan);

// PUT
router.put("/:id", updateKerusakan);

// DELETE
router.delete("/:id", hapusKerusakan);

module.exports = router;

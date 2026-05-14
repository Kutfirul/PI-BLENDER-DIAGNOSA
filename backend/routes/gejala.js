const express = require("express");
const router = express.Router();

const {
  getGejala,
  tambahGejala,
  updateGejala,
  hapusGejala,
} = require("../controllers/gejalaController");

// GET
router.get("/", getGejala);

// POST
router.post("/", tambahGejala);

// PUT
router.put("/:id", updateGejala);

// DELETE
router.delete("/:id", hapusGejala);

module.exports = router;

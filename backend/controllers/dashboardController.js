const db = require("../db");

// ==========================
// GET statistik dashboard
// ==========================
exports.getDashboard = (req, res) => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM gejala) as total_gejala,
      (SELECT COUNT(*) FROM kerusakan) as total_kerusakan,
      (SELECT COUNT(*) FROM rule) as total_rule
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
};

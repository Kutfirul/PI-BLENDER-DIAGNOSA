const db = require("../db");

// ==========================
// GET semua rule
// ==========================
exports.getRule = (req, res) => {
  const query = `
    SELECT 
      r.id_rule,
      k.nama_kerusakan,
      g.nama_gejala,
      rd.cf_pakar
    FROM rule r
    JOIN kerusakan k
      ON r.id_kerusakan = k.id_kerusakan
    JOIN rule_detail rd
      ON r.id_rule = rd.id_rule
    JOIN gejala g
      ON rd.id_gejala = g.id_gejala
    ORDER BY r.id_rule DESC
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ==========================
// TAMBAH rule
// ==========================
exports.tambahRule = (req, res) => {
  const { id_kerusakan, gejala } = req.body;

  // validasi
  if (!id_kerusakan || !gejala || gejala.length === 0) {
    return res.status(400).json({
      message: "Data tidak lengkap",
    });
  }

  // insert ke table rule
  db.query(
    "INSERT INTO rule (id_kerusakan) VALUES (?)",
    [id_kerusakan],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json(err);
      }

      const id_rule = result.insertId;

      let count = 0;

      // insert ke rule_detail
      gejala.forEach((g) => {
        db.query(
          `INSERT INTO rule_detail 
          (id_rule, id_gejala, cf_pakar)
          VALUES (?, ?, ?)`,
          [id_rule, g.id_gejala, g.cf],
          (err2) => {
            if (err2) {
              console.log(err2);

              return res.status(500).json(err2);
            }

            count++;

            // jika semua selesai
            if (count === gejala.length) {
              res.json({
                message: "Rule berhasil disimpan",
                id_rule: id_rule,
              });
            }
          },
        );
      });
    },
  );
};

// ==========================
// DELETE rule
// ==========================
exports.hapusRule = (req, res) => {
  const id = req.params.id;

  // hapus detail dulu
  db.query("DELETE FROM rule_detail WHERE id_rule=?", [id], (err) => {
    if (err) return res.status(500).json(err);

    // hapus rule
    db.query("DELETE FROM rule WHERE id_rule=?", [id], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        message: "Rule berhasil dihapus",
      });
    });
  });
};

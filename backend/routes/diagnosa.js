const express = require("express");
const router = express.Router();
const db = require("../db");

// ==========================
// POST diagnosa
// ==========================
router.post("/", (req, res) => {
  const input = req.body.gejala || {};

  db.query("SELECT * FROM rule", (err, rules) => {
    if (err) return res.status(500).json(err);

    let hasil = {};

    let promises = rules.map((rule) => {
      return new Promise((resolve) => {
        db.query(
          "SELECT * FROM rule_detail WHERE id_rule=?",
          [rule.id_rule],
          (err, details) => {
            if (err) {
              console.log(err);
              resolve();
              return;
            }

            let cf_total = 0;

            details.forEach((d) => {
              if (input[d.id_gejala]) {
                let cf_user = input[d.id_gejala];
                let cf = cf_user * d.cf_pakar;

                // CF Combine
                cf_total = cf_total + cf * (1 - cf_total);
              }
            });

            hasil[rule.id_kerusakan] = cf_total;

            resolve();
          },
        );
      });
    });

    Promise.all(promises).then(() => {
      // sort CF terbesar
      let sorted = Object.entries(hasil).sort((a, b) => b[1] - a[1]);

      // jika tidak ada hasil
      if (sorted.length === 0) {
        return res.json({
          message: "Tidak ada hasil diagnosa",
        });
      }

      let id_kerusakan = sorted[0][0];
      let nilai_cf = sorted[0][1];

      db.query(
        "SELECT * FROM kerusakan WHERE id_kerusakan=?",
        [id_kerusakan],
        (err, result) => {
          if (err) return res.status(500).json(err);

          if (result.length === 0) {
            return res.json({
              message: "Kerusakan tidak ditemukan",
            });
          }

          let k = result[0];

          let estimasi = nilai_cf * k.harga_max;

          res.json({
            kerusakan: k.nama_kerusakan,
            cf: Number(nilai_cf.toFixed(2)),
            persentase: Math.round(nilai_cf * 100),
            harga_range: `Rp${k.harga_min} - Rp${k.harga_max}`,
            estimasi: Math.round(estimasi),
            solusi: k.solusi,
          });
        },
      );
    });
  });
});

module.exports = router;

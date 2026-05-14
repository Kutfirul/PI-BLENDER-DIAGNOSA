const db = require("../db");

// ==========================
// GET semua gejala
// ==========================
exports.getGejala = (req, res) => {
  db.query("SELECT * FROM gejala", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ==========================
// TAMBAH gejala
// ==========================
exports.tambahGejala = (req, res) => {
  const { id_gejala, nama_gejala } = req.body;

  // cek ID sudah ada atau belum
  db.query(
    "SELECT * FROM gejala WHERE id_gejala=?",
    [id_gejala],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({
          message: "ID sudah digunakan",
        });
      }

      // insert data
      db.query(
        "INSERT INTO gejala (id_gejala, nama_gejala) VALUES (?, ?)",
        [id_gejala, nama_gejala],
        (err, result) => {
          if (err) return res.status(500).json(err);

          res.json({
            message: "Gejala berhasil ditambahkan",
          });
        },
      );
    },
  );
};

// ==========================
// UPDATE gejala
// ==========================
exports.updateGejala = (req, res) => {
  const id = req.params.id;
  const { nama_gejala } = req.body;

  db.query(
    "UPDATE gejala SET nama_gejala=? WHERE id_gejala=?",
    [nama_gejala, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.json({
          message: "Data tidak ditemukan",
        });
      }

      res.json({
        message: "Gejala berhasil diupdate",
      });
    },
  );
};

// ==========================
// DELETE gejala
// ==========================
exports.hapusGejala = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM gejala WHERE id_gejala=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Gejala berhasil dihapus",
    });
  });
};

const db = require("../db");

// ==========================
// GET semua kerusakan
// ==========================
exports.getKerusakan = (req, res) => {
  db.query("SELECT * FROM kerusakan", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ==========================
// TAMBAH kerusakan
// ==========================
exports.tambahKerusakan = (req, res) => {
  const { id_kerusakan, nama_kerusakan, solusi, harga_min, harga_max } =
    req.body;

  db.query(
    `INSERT INTO kerusakan 
    (id_kerusakan, nama_kerusakan, solusi, harga_min, harga_max)
    VALUES (?, ?, ?, ?, ?)`,
    [id_kerusakan, nama_kerusakan, solusi, harga_min, harga_max],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Kerusakan berhasil ditambahkan",
      });
    },
  );
};

// ==========================
// UPDATE kerusakan
// ==========================
exports.updateKerusakan = (req, res) => {
  const id = req.params.id;

  const { nama_kerusakan, solusi, harga_min, harga_max } = req.body;

  db.query(
    `UPDATE kerusakan 
    SET nama_kerusakan=?, solusi=?, harga_min=?, harga_max=?
    WHERE id_kerusakan=?`,
    [nama_kerusakan, solusi, harga_min, harga_max, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Kerusakan berhasil diupdate",
      });
    },
  );
};

// ==========================
// DELETE kerusakan
// ==========================
exports.hapusKerusakan = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM kerusakan WHERE id_kerusakan=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Kerusakan berhasil dihapus",
      });
    },
  );
};

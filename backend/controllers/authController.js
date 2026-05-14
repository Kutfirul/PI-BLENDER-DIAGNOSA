const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_LOGIN_ADMIN";

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE username=?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({
          message: "Username tidak ditemukan",
        });
      }

      const admin = result[0];

      // cek password
      const validPassword = await bcrypt.compare(password, admin.password);

      if (!validPassword) {
        return res.status(401).json({
          message: "Password salah",
        });
      }

      // token JWT
      const token = jwt.sign(
        {
          id_admin: admin.id_admin,
          username: admin.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );

      res.json({
        message: "Login berhasil",
        token,
        admin: {
          id_admin: admin.id_admin,
          username: admin.username,
        },
      });
    },
  );
};

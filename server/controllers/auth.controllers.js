import { pool as db } from "../db.js";
import bcrypt from 'bcrypt';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../storedData/profilePhotos'));
  },
  filename: (req, file, cb) => {
    cb(null, req.session.user[0].username+'.png');
  },
});

const upload = multer({ storage });

const saltRounds = 10;

const authController = {
  home: (req, res) => {
    res.send("hi");
  },

  register: async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const tel = req.body.tel;

    try {
      const hash = await bcrypt.hash(password, saltRounds);

      const data = {
        name: name,
        username: username,
        email: email,
        password: hash,
        tel: tel,
      };

      const checkEmail = `SELECT * FROM users WHERE email=?`;
      const checkUsername = `SELECT * FROM users WHERE username=?`;
      const [checkEmailResult] = await db.query(checkEmail, [email]);
      const [checkUsernameResult] = await db.query(checkUsername, [username]);

      if (checkEmailResult.length > 0 && checkUsernameResult > 0) {
        return res.status(400).send({ msg: "Username or Email Already Present" });
      } else {
        const insertSql = "INSERT INTO `users` SET ?";
        const [insertResult] = await db.query(insertSql, [data]);
        res.send(insertResult);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Error registering user" });
    }
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const [result] = await db.query('SELECT * FROM users WHERE email=?', [email]);

      if (result.length > 0) {
        const response = await bcrypt.compare(password, result[0].password);

        if (response) {
          req.session.user = result;
          res.send({ login: true, useremail: email });
        } else {
          res.send({ login: false, msg: "Wrong Password" });
        }
      } else {
        res.send({ login: false, msg: "User Email Not Exists" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Database error" });
    }
  },

  checkLogin: (req, res) => {
    if (req.session.user) {
      res.send({ login: true, user: req.session.user });
    } else {
      res.send({ login: false });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error logging out" });
      }
      res.clearCookie("connect.sid");
      res.send({ logout: true });
    });
  },

  uploadProfileImage: async (req, res) => {
    upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }
    try {
      if (!req.file) {
        return res.status(400).send({ msg: 'No file was uploaded.' });
      }

      const imageUrl = `${req.session.user[0].username}.png`;
      const userId = req.session.user[0].id;
      const updateSql = 'UPDATE users SET profile_photo = ? WHERE id = ?';
      db.query(updateSql, [imageUrl, userId]);

      res.send({ msg: 'Image uploaded and profile updated successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ msg: 'Error uploading image.' });
    }
  });
  },
};


export default authController;

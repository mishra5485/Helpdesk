const mongoose = require("mongoose");
const { Admin, validate } = require("../models/admin");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email });
  if (!admin) return res.status(403).send("Invalid email or password");

  bcrypt.compare(password, admin.password, function (err, result) {
    if (!result) return res.send("Invalid email or password");
    else {
      const token = generateAuthToken({ email });
      res
        .status(200)
        .header("x-auth-token", token)
        .send({ username: admin.name, token: token });
    }
  });
});

router.post("/register", async (req, res) => {
  const response = await validate(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  const { name, email, password, department_name, isAdmin } = req.body;

  let admin = await Admin.findOne({ email: email });
  if (admin) return res.send("Admin already registered. Please login in!");

  admin = new Admin({
    _id,
    name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password,
    department_name,
    isAdmin,
  });
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    admin.password = hash;
    await admin.save();
  });

  const token = generateAuthToken({ email });
  res.status(200).header("x-auth-token", token).send(email.toLowerCase());
});

generateAuthToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = router;

const mongoose = require("mongoose");
const { CommonUser, validateAdmin } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateAuthToken = require("../common/utils");

router.post("/register", async (req, res) => {
  const response = await validateAdmin(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  let { name, email, password } = req.body;
  email = email.toLowerCase();

  let admin = await CommonUser.findOne({ email: email });
  if (admin) return res.send("Admin already registered. Please login in!");

  admin = new CommonUser({
    _id,
    name,
    email,
    password,
    access_level: "admin",
  });
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    admin.password = hash;
    await admin.save();
  });

  const token = generateAuthToken({ email });
  res.status(200).header("x-auth-token", token).send(email);
});

module.exports = router;

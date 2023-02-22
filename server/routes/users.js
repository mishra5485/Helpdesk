const mongoose = require("mongoose");
const { CommonUser, validateEndUser } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateAuthToken = require("../common/utils");

router.post("/register", async (req, res) => {
  const response = await validateEndUser(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  let { name, email, password } = req.body;
  email = email.toLowerCase();

  let user = await CommonUser.findOne({ email: email, status: 1 });
  if (user) {
    return res.status(403).send("Already registered. Please login in!");
  } else {
    let createdAt = getTimestamp();
    user = new CommonUser({
      _id,
      name,
      email,
      password,
      createdAt,
      access_level: "user",
    });
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) console.log(err);
      user.password = hash;
      await user.save();
    });

    const token = generateAuthToken({ email });
    res.status(200).header("x-auth-token", token).send(email.toLowerCase());
  }
});

module.exports = router;

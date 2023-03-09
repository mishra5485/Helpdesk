const mongoose = require("mongoose");
const { CommonUser, validateAdmin } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateAuthToken = require("../middleware/auth");
const auth = require("../common/auth");

router.post("/register", async (req, res) => {
  const response = await validateAdmin(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  let { name, email, password } = req.body;
  email = email.toLowerCase();

  let admin = await CommonUser.findOne({ email: email, status: 1 });
  if (admin) {
    return res.send("Already registered. Please login in!");
  } else {
    let createdAt = getTimestamp();
    let access_level = "admin",
      admin = new CommonUser({
        _id,
        name,
        email,
        password,
        createdAt,
        access_level,
      });
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) console.log(err);
      admin.password = hash;
      await admin.save();
    });

    const payload = { email, access_level };
    const token = generateAuthToken({ payload });
    res.status(200).header("x-auth-token", token).send(email);
  }
});

router.get("/admin/profile/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await CommonUser.find({
      $and: [{ _id: id }, { access_level: "admin" }],
    });
    if (!admin || admin.length == 0)
      return res.send("Unable to find admin. Please provide valid id");

    res.send(admin);
  } catch {
    res.send("Unable to fetch details");
  }
});

module.exports = router;

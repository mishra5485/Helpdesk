const mongoose = require("mongoose");
const { CommonUser, validateEmployee } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

router.post("/register", async (req, res) => {
  const response = await validateEmployee(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  let { name, email, password, department_name } = req.body;
  email = email.toLowerCase();

  let employee = await CommonUser.findOne({ email: email });
  if (employee)
    return res.send("Employee already registered. Please login in!");

  employee = new CommonUser({
    _id,
    name,
    password,
    department_name,
    email,
    access_level: "employee",
  });
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    employee.password = hash;
    await employee.save();
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

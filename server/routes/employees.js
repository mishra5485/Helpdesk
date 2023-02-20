const mongoose = require("mongoose");
const { CommonUser, validateEmployee } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateAuthToken = require("../common/utils");

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

router.get("/:id", async (req, res) => {
  try {
    let employee = await CommonUser.findById(req.params.id);
    if (employee.access_level === "employee") {
      const { _id, name, department_name, email } = employee;
      delete employee.password;
      res.status(200).send({ _id, name, department_name, email });
    }
  } catch (ex) {
    res
      .status(404)
      .send("Employee not found. Please provide a valid employee id");
  }
});

router.get("/emp/all/:limit/:pageNumber", async (req, res) => {
  try {
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    let allUsers = await CommonUser.find({}).limit(limit).skip(skippedItems);
    let allemp = allUsers.filter((e) => e.access_level === "employee");
    let count = allemp.length;

    const usersWithoutPassword = allemp.map((e) => {
      const { password, ...userWithoutPassword } = e;
      return userWithoutPassword;
    });
    res.send({ employees: allemp, count });
  } catch (ex) {
    res.status(404).send("Unable to fetch employees");
  }
});

module.exports = router;

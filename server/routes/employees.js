const mongoose = require("mongoose");
const { CommonUser, validateEmployee } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const generateAuthToken = require("../common/utils");
const getTimestamp = require("../common/utils");

router.post("/register", async (req, res) => {
  const response = await validateEmployee(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  let lastEmployeeNumber;
  try {
    const lastEmployee = await CommonUser.findOne({
      access_level: "employee",
    }).sort({ employeeNumber: -1 });
    if (lastEmployee) {
      lastEmployeeNumber = lastEmployee.employeeNumber;
      lastEmployeeNumber++;
    }
  } catch (ex) {}

  const _id = uuidv4();
  let { name, email, password, department_name } = req.body;
  email = email.toLowerCase();

  let employee = await CommonUser.findOne({ email: email });
  if (employee)
    return res.send("Employee already registered. Please login in!");
  let createdAt = getTimestamp();
  console.log(createdAt);
  employee = new CommonUser({
    _id,
    name,
    password,
    department_name,
    email,
    employeeNumber: lastEmployeeNumber,
    createdAt,
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
      const {
        _id,
        name,
        department_name,
        email,
        employeeNumber,
        access_level,
        createdAt,
      } = employee;
      delete employee.password;
      res.status(200).send({
        _id,
        name,
        department_name,
        email,
        employeeNumber,
        access_level,
        createdAt,
      });
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
    let employees = await CommonUser.find({
      access_level: "employee",
      status: 1,
    })
      .limit(limit)
      .skip(skippedItems);
    let count = await CommonUser.countDocuments({
      access_level: "employee",
      status: 1,
    });
    res.status(200).send({ employees, count });
  } catch (ex) {
    res.status(404).send("Unable to fetch employees");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await CommonUser.find({
      _id: id,
      access_level: "employee",
    });
    if (!employee || employee.length === 0) {
      res.status(500).send("Failed to delete employee");
    } else {
      CommonUser.findByIdAndUpdate(id, { status: 0 }, function (err, docs) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(docs);
        }
      });
    }
  } catch (ex) {
    res.status(500).send("Failed to delete employee");
  }
});

module.exports = router;

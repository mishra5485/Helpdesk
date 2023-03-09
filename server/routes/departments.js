const express = require("express");
const router = express.Router();
const { validatedepartment } = require("../middleware/validator");
const { v4: uuidv4 } = require("uuid");
const { Department } = require("../models/department");

router.post("/createdepartment", async (req, res) => {
  const response = await validatedepartment(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }
  let lastDepartmentNumber;
  try {
    const lastDepartment = await Department.findOne().sort({
      DepartmentNumber: -1,
    });
    if (lastDepartment) {
      lastDepartmentNumber = lastDepartment.DepartmentNumber;
      lastDepartmentNumber++;
    }
  } catch (ex) {}

  const _id = uuidv4();
  let { name, description } = req.body;
  user = new Department({
    _id,
    name,
    description,
    DepartmentNumber: lastDepartmentNumber,
  });
  await user.save();
  res.send("CREATED SUCCESSFULL");
});

router.get("/getdepartment", async (req, res) => {
  let user = await Department.find();
  let departmentname = await user.map((elem) => elem.name);
  res.send(departmentname);
});

router.get("/all/department/:limit/:pageNumber", async (req, res) => {
  try {
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    let departments = await Department.find({})
      .limit(limit)
      .skip(skippedItems)
      .sort({
        DepartmentNumber: -1,
      });

    let count = await Department.countDocuments({});
    res.status(200).send({ departments: departments, count: count });
  } catch (ex) {
    res.status(404).send("Unable to fetch tickets");
  }
});

router.post("/search/:limit/:pageNumber", async (req, res) => {
  try {
    const { keyword } = req.body;
    let limit = req.params.limit;
    let pageNumber = req.params.pageNumber;
    let skippedItems = pageNumber * limit;
    const regexp = new RegExp(keyword, "i");
    console.log("regexp");
    const result = await Department.find({
      $or: [{ DepartmentNumber: regexp }, { name: regexp }],
    })
      .limit(limit)
      .skip(skippedItems);
    let count = result.length;
    res.status(200).send({ department: result, count });
  } catch (ex) {
    res.status(500).send("Failed to search");
  }
});

module.exports = router;

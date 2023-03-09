const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { validatedepartment } = require("../middleware/validator");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { Department } = require("../models/department");
const { Router } = require("express");

router.post("/createdepartment", async (req, res) => {
  const response = await validatedepartment(req.body);
  if (response.error) {
    return res.status(400).send(response.errorMessage);
  }

  const _id = uuidv4();
  let { name, description } = req.body;
  user = new Department({
    _id,
    name,
    description,
  });
  await user.save();
  res.send("CREATED SUCCESSFULL");
});

///////////////////////////////////////////////////////////////////////////////////////////
router.get("/getdepartment", async (req, res) => {
  let user = await Department.find();
  console.log(user);
  let departmentname = await user.map((elem) => elem.name);
  console.log(departmentname);

  res.send(departmentname);
});
//////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/update/:id",async (req ,res)=>{
//     let { name,description } =req.body
//     const {id } = req.params

//     let user = await Department.findOneAndUpdate(req.params ,req.body)
//     res.send("update successfully")

// })

//////////////////////////////////////////////////////////////////////////////////////

router.get("/getalldepartment", async (req, res) => {
  let user = await Department.find();
  console.log(user);
  // let departmentname= await user.map(elem=>elem.name)
  // console.log(departmentname)

  res.send(user);
});

module.exports = router;

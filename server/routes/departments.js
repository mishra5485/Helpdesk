const mongoose = require("mongoose");
// const { CommonUser, validateAdmin } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// const generateAuthToken = require("../common/utils");
const { Department } = require("../models/department");
const { Router } = require("express");

// router.post("/createdepartment",async (req ,res)=>{
//     const _id= uuidv4 ();
//     let {name ,description, employees} = req.body
//     user = new Department({
//         _id,
//         name,
//         description,
//         employees,
//      });
//     await user.save();
//     res.send("CREATED SUCCESSFULL")
// })

router.get("/getdepartment", async (req, res) => {
  let user = await Department.find();
  let departmentname = await user.map((elem) => elem.name);
  //   console.log(departmentname);

  res.send(departmentname);
});

// router.post("/update/:id",async (req ,res)=>{
//     let { name,description } =req.body
//     const {id } = req.params

//     let user = await Department.findOneAndUpdate(req.params ,req.body)
//     res.send("update successfully")

// })

module.exports = router;

const mongoose = require("mongoose");
// const { CommonUser, validateAdmin } = require("../models/commonUser");
const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const {validatedepartment} =require ("../middleware/validator")
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// const generateAuthToken = require("../common/utils");
const { Department } = require("../models/department");
const { Router } = require("express");




router.post("/createdepartment",async (req ,res)=>{
    const response = await validatedepartment(req.body);
    if(response.error){
        return res.status(400).send(response.errorMessage);
    }

    let lastDeptNumber;
    try{
        const lastDepartment = await Department.findOne().sort({  departmentid: -1 });
        console.log(lastDepartment)
        if(lastDepartment){
            lastDeptNumber = lastDepartment.departmentid;
            lastDeptNumber++;
            console.log(lastDeptNumber)
        }

    }catch(ex){}
    
    const _id= uuidv4 ();
    let {name ,description} = req.body
    let department = new Department({
        _id,
        name,
        description,
        departmentid:lastDeptNumber
         });
    await department.save();
    res.send("CREATED SUCCESSFULL")
})


router.get("/all/:limit/:pageNumber" ,async (req, res) => {
    try {
      let limit = req.params.limit;
      let pageNumber = req.params.pageNumber;
      let skippedItems = pageNumber * limit;
      let departments = await Department.find({}).limit(limit).skip(skippedItems).sort({
        departmentid: -1,
      });
  
      let count = await Department.countDocuments({});
      res.status(200).send({ departments: departments, count: count });
    } catch (ex) {
      res.status(404).send("Unable to fetch tickets");
    }
  });




///////////////////////////////////////////////////////////////////////////////////////////
router.get("/getdepartment",async (req ,res)=>{
    
    let user = await Department.find()
    console.log(user)
    let departmentname= await user.map(elem=>elem.name)
    console.log(departmentname)

    
    
    res.send(departmentname)

})
//////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/update/:id",async (req ,res)=>{
//     let { name,description } =req.body
//     const {id } = req.params
    
//     let user = await Department.findOneAndUpdate(req.params ,req.body)
//     res.send("update successfully")

// })

//////////////////////////////////////////////////////////////////////////////////////

router.get("/getalldepartment",async (req ,res)=>{
    
    let user = await Department.find()
    console.log(user)
    // let departmentname= await user.map(elem=>elem.name)
    // console.log(departmentname)

    
    
    res.send(user)

})








module.exports = router;
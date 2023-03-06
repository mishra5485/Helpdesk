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
    const _id= uuidv4 ();
    let {name ,description} = req.body
    const response = await validatedepartment(req.body);
    if(response.error){
        return res.status(400).send(response.errorMessage);
    }
    
    user = new Department({
        _id,
        name,
        description,
         });
    await user.save();
    res.send("CREATED SUCCESSFULL")
})


// let lastdepartmentnumber;
// try {
//   const lastdepartment = await Department.findOne().sort({ departmentnumber: -1 });
//   if (lastdepartment) {
//     lastdepartmentnumber = lastdepartment.departmentnumber;
//     lastdepartmentnumber++;
//   }
// } catch (ex) {}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/create-ticket", async (req, res) => {
//     const response = await validate(req.body);
//     if (response.error) {
//       return res.status(400).send(response.errorMessage);
//     }
  
//     let lastTicketNumber;
//     try {
//       const lastTicket = await Ticket.findOne().sort({ ticketNumber: -1 });
//       if (lastTicket) {
//         lastTicketNumber = lastTicket.ticketNumber;
//         lastTicketNumber++;
//       }
//     } catch (ex) {}
  
//     const _id = uuidv4();
//     const { subject, body, user_id, department_name } = req.body;
//     console.log(user_id);
//     let ticket = new Ticket({
//       _id,
//       subject,
//       body,
//       user_id,
//       department_name,
//       ticketNumber: lastTicketNumber,
//     });
//     await ticket.save();
//     res.status(200).send("Ticket created successfully!");
//   });


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/getdepartment",async (req ,res)=>{
    
    let user = await Department.find()
    console.log(user)
    let departmentname= await user.map(elem=>elem.name)
    console.log(departmentname)

    
    
    res.send(departmentname)

})


// router.post("/update/:id",async (req ,res)=>{
//     let { name,description } =req.body
//     const {id } = req.params
    
//     let user = await Department.findOneAndUpdate(req.params ,req.body)
//     res.send("update successfully")

// })


// router.get("/all/:limit/:pageNumber", auth, async (req, res) => {
//     try {
//       let limit = req.params.limit;
//       let pageNumber = req.params.pageNumber;
//       let skippedItems = pageNumber * limit;
//       let tickets = await Ticket.find({}).limit(limit).skip(skippedItems).sort({
//         ticketNumber: -1,
//       });
  
//       let count = await Department.countDocuments({});
//       res.status(200).send({ tickets: tickets, count: count });
//     } catch (ex) {
//       res.status(404).send("Unable to fetch tickets");
//     }
//   });


router.get("/getalldepartment",async (req ,res)=>{
    
    let user = await Department.find()
    console.log(user)
    // let departmentname= await user.map(elem=>elem.name)
    // console.log(departmentname)

    
    
    res.send(user)

})








module.exports = router;
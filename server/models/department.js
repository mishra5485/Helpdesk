const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  departmentid: {
    type: String,
    unique: true,
    default: 100,
    index: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  // employees: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Employee",
  //   },
  // ],
});

const Department = mongoose.model("Department", departmentSchema);

exports.Department = Department;

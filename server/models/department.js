const mongoose = require("mongoose");
var moment = require("moment");

const departmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  DepartmentNumber: {
    type: String,
    unique: true,
    default: 100,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    default: moment().format("MMM Do YYYY"),
  },
});

const Department = mongoose.model("Department", departmentSchema);

exports.Department = Department;

const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  department_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  token: { type: String },
});

const Employee = mongoose.model("Employee", employeeSchema);

async function validateEmployee(employee) {
  let error = false;
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    department_name: Joi.string().min(2).max(50).required(),
  });

  try {
    const value = await schema.validateAsync(employee);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

exports.Employee = Employee;
exports.validate = validateEmployee;

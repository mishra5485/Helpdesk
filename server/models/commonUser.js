const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  _id: { type: String },
  employeeNumber: {
    type: String,
    unique: true,
    index: true,
  },
  name: { type: String, index: true },
  password: { type: String },
  picture: { type: String },
  access_level: { type: String },
  token: { type: String },
  department_name: { type: String },
  email: { type: String },
  createdAt: { type: String },
  status: { type: Number, required: true, default: 1 },
  resetPasswordToken: { type: String, default: undefined },
  resetPasswordExpires: { type: String, default: undefined },
});

const CommonUser = mongoose.model("AllUser", userSchema);

async function validateAdmin(admin) {
  let error = false;
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  try {
    const value = await schema.validateAsync(admin);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

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

async function validateEndUser(endUser) {
  let error = false;
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  try {
    const value = await schema.validateAsync(endUser);
    return { error, value };
  } catch (err) {
    error = true;
    let errorMessage = err.details[0].message;
    return { error, errorMessage };
  }
}

exports.CommonUser = CommonUser;
exports.validateAdmin = validateAdmin;
exports.validateEmployee = validateEmployee;
exports.validateEndUser = validateEndUser;

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
    minLength: [3, "First name must contain atleast 3 characters!"],
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
    minLength: [3, "Last name must contain atleast 3 characters!"],
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    validate: [validator.isEmail, "please provide valid Email id"],
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digits"],
    maxLength: [10, "Phone number must contain exact 10 digits"],
  },
  aadhar: {
    type: mongoose.Schema.Types.String,
    required: true,
    minLength: [12, "aadhar must contain exact 12 digits"],
    maxLength: [12, "aadhar must contain exact 12 digits"],
  },
  gender: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ["male", "female"],
  },
  dateOfBirth: {
    type: mongoose.Schema.Types.Date,
    required: [true, "date OfBirth is required!"],
  },
  password: {
    type: mongoose.Schema.Types.String,
    minLength: [8, "password must contain atleast 8 characters"],
    required: true,
    select: false,
  },
  role: {
    type: mongoose.Schema.Types.String,
    requred: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: mongoose.Schema.Types.String,
  },
  docAvatar: {
    public_id: mongoose.Schema.Types.String,
    url: mongoose.Schema.Types.String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);

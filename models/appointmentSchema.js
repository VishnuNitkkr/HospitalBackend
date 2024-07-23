import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain atleast 3 characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "please provide valid Email id"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digits"],
    maxLength: [10, "Phone number must contain exact 10 digits"],
  },
  aadhar: {
    type: String,
    required: true,
    minLength: [12, "aadhar must contain exact 12 digits"],
    maxLength: [12, "aadhar must contain exact 12 digits"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "DOB is required!"],
  },
  appointment_date: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    required: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);

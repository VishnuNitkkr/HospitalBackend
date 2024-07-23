import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: mongoose.Schema.Types.String,
    required: true,
    minLength: [10, "Message must contain at least 10 characters!"],
  },
});

export const Message = mongoose.model("Message",messageSchema);

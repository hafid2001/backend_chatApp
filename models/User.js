import mongoose from "mongoose";
import { timeStamp } from "node:console";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    passwrod: { type: String, required: true, minlenght: 6 },
    profilePic: { type: String, default: "" },
    bio: { type: String },
  },
  { timestamp: true },
);

const User = mongoose.model("User", userSchema);

export default User;

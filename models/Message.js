import mongoose from "mongoose";
import { timeStamp } from "node:console";
import { receiveMessageOnPort } from "node:worker_threads";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: { type: String },
    image: { type: String },
    seen: { type: Boolean, default: false },
  },
  { timestamp: true },
);

const Message = mongoose.model("Message", messaeSchema);

export default Message;

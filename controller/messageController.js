import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import {io , userSocketMap} from "../server.js"
 
//Get all users except the logged in user
export const getUserForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password",
    );

    // Count number of messages not seen

    const unseenMessages = {};
    const promises = filterUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res.json({ sucess: true, user: filterUsers, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};
//Get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectdUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectdUserId },
        { senderId: selectdUserId, receiverId: myId },
      ],
    });
    await Message.updateMany(
      { senderId: selectdUserId, receiverId: myId },
      { seen: true },
    );
    res.json({ sucess: true, messages });
  } catch {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};

//api tomark message as seen using message id

export const markMessageAsseen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ sucess: true });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};

  // controller for send message
export const sendmessage = async(req,res) =>{
 try{
  const {text , image} = req.body;
  const receiverId = req.params.id;
  const senderId = req.user._id;

  let imageUrl;
  if(Image){
    const uploadResponse = await cloudinary.uploader.upload(Image)
      ImageUrl = uploadResponse.secure_url;
    
  }
  const newMessage = await Messages.create({
    senderId,
    receiverId,
    text,
    image : imageUrl
  })

//Emit the new messae to the receiver's socket 
const reciverSocketId = userSocketMap[receiverId];
if (reciverSocketId){
  io.to(reciverSocketId).emit("newMessage",newMessage)
}



  res.json({succes: true , newMessage});

}catch (error) {
    console.log(error.mesaage);
    res.json({ succes: false, mesaage: error.mesaage });
  }
};


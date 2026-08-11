import User from "../models/User";
import Jwt  from "jsonwebtoken";



export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = JsonWebTokenError.verify(token, process.env.JWT_SECRET);
    const user = await UserActivation.findById(decoded.userId).select(
      "-passwrod",
    );

    if (!user) return res.json({ succes: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("error.message");
    res.json({ succes: false, message: "error.message" });
  }
};

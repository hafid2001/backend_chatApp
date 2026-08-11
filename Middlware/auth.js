import User from "../models/User.js";
import Jwt from "jsonwebtoken";

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
//Controller to check if user is authenticated

export const checkAuth = async (req, res) => {
  res.json({ succes: true, user: req.user });
};

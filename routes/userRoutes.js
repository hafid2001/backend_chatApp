import express from "express";
import {Login,signup, updateProlfile,}  from "../controller/userController.js";
import {protectRoute,checkAuth} from "../Middlware/auth.js"


const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",Login);
userRouter.put("/update-profile",protectRoute,updateProlfile);
userRouter.get("/check",protectRoute,checkAuth);

export default userRouter;
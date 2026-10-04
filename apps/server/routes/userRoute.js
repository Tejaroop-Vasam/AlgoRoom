import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { registerUser, loginUser, updateUser, profileUser, passwordChangeUser } from "../controllers/userCtrl.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

// Create User table on server start - If not exists
userRouter.get("/", async (req, res) => {
    try {
        await User.createTables();
        console.log("Tables created successfully");
        res.status(200).json({ message: "Tables created successfully" });
    }
    catch (err) {
        console.error("Error creating tables:", err);
        res.status(500).json({ error: "Error creating tables" });
    }
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", auth, updateUser);
userRouter.get("/profile", auth, profileUser);
userRouter.put("/change-password", auth, passwordChangeUser);

export default userRouter;
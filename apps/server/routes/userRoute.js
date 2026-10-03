import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userRouter = express.Router();

// Create User table on server start - If not exists
userRouter.get("/", async (req, res) => {
    try {
        await User.createTable();
        console.log("User table created successfully");
        res.status(200).json({ message: "User table created successfully" });
    }
    catch (err) {
        console.error("Error creating user table:", err);
        res.status(500).json({ error: "Error creating user table" });
    }
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Register a new user
async function registerUser(req, res) {
    try{
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ error: "Please provide username, email, and password" });
        }
        const usernameRegx = /^[a-zA-Z0-9_]+$/;
        if(!usernameRegx.test(username)) {
            return res.status(400).json({ error: "Username can only contain letters, numbers, and underscores" });
        }
        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegx.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if(password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const user = await User.insert({ username, email, password });
        const { hpassword, ...userResponse } = user;
        return res.status(201).json({
            message: "User registered successfully!",
            user: userResponse,
        });
    }
    catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Error registering user" });
    }
}

// Login a user
async function loginUser(req, res) {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }
        const isPass = await bcrypt.compare(password, user.hpassword);
        if (!isPass) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, is_admin: user.is_admin },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
        );
        const { hpassword, ...userResponse } = user;
        return res.status(200).json({
            message: "User logged in successfully!",
            user: userResponse,
        });
    }
    catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ error: "Error logging in user" });
    }
}
export default userRouter;
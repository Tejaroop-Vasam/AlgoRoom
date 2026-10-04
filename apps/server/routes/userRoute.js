import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
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
            token,
            user: userResponse,
        });
    }
    catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ error: "Error logging in user" });
    }
}

// Update user details
async function updateUser(req, res){
    try{
        const userID = req.user.id;
        const body = req.body;
        const fieldsToUpdate = {};
        if (body.username !== undefined && body.username.trim() !== "") {
            const usernameRegx = /^[a-zA-Z0-9_]+$/;
            if(!usernameRegx.test(body.username)) {
                return res.status(400).json({ error: "Username can only contain letters, numbers, and underscores" });
            }
            fieldsToUpdate.username = body.username.trim();
        }
        if (body.email !== undefined && body.email.trim() !== "") {
            const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegx.test(body.email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }
            const formattedEmail = body.email.trim().toLowerCase();
            const existingUser = await User.findByEmail(formattedEmail);
            if (existingUser && existingUser.id !== userID) {
                return res.status(400).json({ error: "Email is already in use by another user" });
            }
            fieldsToUpdate.email = formattedEmail;
        }
        if(Object.keys(fieldsToUpdate).length === 0){
            return res.status(400).json({ error: "No valid fields to update" });
        }
        const updatedUser = await User.update(userID, fieldsToUpdate);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const { hpassword, ...userResponse } = updatedUser;
        return res.status(200).json({
            message: "User updated successfully!",
            user: userResponse,
        });
    }
    catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user" });
    }
}

// Get user profile
async function profileUser(req, res) {
    try{
        const userID = req.user.id;
        const user = await User.findByEmail(req.user.email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { hpassword, ...userResponse } = user;
        return res.status(200).json({
            user: userResponse,
        });
    }
    catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ error: "Error fetching user profile" });
    }
}

// Change user password
async function passwordChangeUser(req, res) {
    try{
        const userID = req.user.id;
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword) {
            return res.status(400).json({ error: "Please provide old and new password" });
        }
        if(newPassword.length < 8) {
            return res.status(400).json({ error: "New password must be at least 8 characters long" });
        }
        if(oldPassword === newPassword) {
            return res.status(400).json({ error: "New password must be different from old password" });
        }
        const user = await User.findByEmail(req.user.email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPass = await bcrypt.compare(oldPassword, user.hpassword);
        if (!isPass) {
            return res.status(400).json({ error: "Old password is incorrect!" });
        }
        await User.changePassword(userID, newPassword);
        return res.status(200).json({
            message: "Password changed successfully!",
        });
    }
    catch (err) {
        console.error("Error changing password:", err);
        res.status(500).json({ error: "Error changing password" });
    }
}
export default userRouter;
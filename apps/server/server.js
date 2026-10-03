import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
dotenv.config();

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'process.env.CLIENT_URL',
    credentials: true,

}));

// Routes
app.use("/", userRouter);

// Server running
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
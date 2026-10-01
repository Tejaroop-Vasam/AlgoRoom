import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
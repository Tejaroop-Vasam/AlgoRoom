import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
dotenv.config();

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", async(req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT current_database() AS database_name");
        console.log(`Connected to database: ${result.rows[0].database_name}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error connecting to the database");
    }
    finally {
        client.release();
    }
  res.send("Server is running");
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
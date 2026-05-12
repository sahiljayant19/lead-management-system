import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch((err) => console.log(err));

// Routes
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
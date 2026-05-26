import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.get("/", (req, res) => res.send("this is my setup"));

const port = process.env.PORT;
app.listen(port, () => {
    connectDB()
  console.log(`your server run on http://localhost:${port}`);
});

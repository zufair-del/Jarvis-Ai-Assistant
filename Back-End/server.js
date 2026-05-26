import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cors({
  mode: 'cors',
  origin: 'https://orange-space-barnacle-g475p5gg7qq53v94p-5173.app.github.dev/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.options('*', cors());
app.use(cookieParser());

dotenv.config();

app.use("/api/auth", authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    connectDB()
  console.log(`your server run on http://localhost:${port}`);
});

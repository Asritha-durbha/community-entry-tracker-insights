import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./db.js";
import {
  getVisitiors,
  addVisitors,
  vehicleType,
  getDates,
} from "./controllers/main_controller.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: " http://localhost:8080",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/visitors", getVisitiors);
app.post("/api/visitors", addVisitors);
app.get("/api/vehicleType", vehicleType);
app.get("/api/Dates", getDates);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  dbConnect();
});

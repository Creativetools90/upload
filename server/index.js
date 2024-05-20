import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Route from "./route/Route.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", Route);
mongoose
  .connect("mongodb://localhost:27017/img")
  .then(() => {
    console.log("db is connected");
    app.listen(3001, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("not connected");
  });

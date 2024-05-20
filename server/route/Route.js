import express from "express";
import multer from "multer";
import { upload ,get } from "../controller/userController.js";
const Route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../client/public/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const uploade = multer({ storage });
Route.post("/upload", uploade.single("file"), upload);
Route.get("/get/",get);

export default Route;

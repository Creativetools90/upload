import express from "express";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import users from "./models/userModel.js";
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/image")
  .then(() => {
    console.log("db is connected");
    app.listen(3001, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("not connected");
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../client/public/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"),async (req, res) => {
  const myNewData = new users({ img: req.file.filename
    , user: req.body.user });
  const saveData = await myNewData.save();
  res.json({ msg:saveData });
});

app.get("/get", async (req,res)=>{
    try{
        const findAll = await  users.find();
        if(!findAll) return res.status(404).json({msg:"not found"});
        res.status(200).json({msg:findAll}); 
    }catch(err){
        res.status(403).json({msg:err})
    }
})
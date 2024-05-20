import users from "../models/userModel.js";


export const upload = async (req, res) => {
  try {
    const myNewData = new users({
      img: req.file.filename,
      user: req.body.user,
    });
    const saveData = await myNewData.save();
    res.json({ msg: saveData });
  } catch (err) {
    res.status(403).json({ msg: err.message });
  }
};

export const get = async (req, res) => {
    try{
        const findAll = await  users.find();
        if(!findAll) return res.status(404).json({msg:"not found"});
        res.status(200).json({msg:findAll}); 
    }catch(err){
        res.status(403).json({msg:err})
    }
}
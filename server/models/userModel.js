import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    img : {type : String , required : true},
    user : {type : String , required : true}
});

export default  mongoose.model('users',userSchema);
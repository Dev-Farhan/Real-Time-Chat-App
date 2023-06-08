import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    isAvatarImageSet : {
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
});
 const User = mongoose.model("Users",userSchema)
export default User;
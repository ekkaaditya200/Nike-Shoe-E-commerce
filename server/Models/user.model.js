import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

// timestamps which is going to tell the mongodb to record the time of cereation of user and update of user

const User = mongoose.model('User',userSchema);
export default User;
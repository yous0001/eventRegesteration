import mongoose from "mongoose";
import { systemRoles } from "../../Utils/enums.utils.js";

const {Schema}=mongoose
const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        tirm: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        tirm: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(systemRoles),
        default: systemRoles.user
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
},{
    timestamps:true
})

export default mongoose.model("User",userSchema)
import mongoose  from "mongoose"
const userSchema = new mongoose.Schema({
    username : {
        type:String,
        min:3,
        max:25,
    },
    email : { 
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type : String,
        required:true,
        min:8,
    },
    profilepic:{
        type:String,
        default:"ProfileImage/1652869542542userprofile.jpg"
    },
    start: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model("users", userSchema)
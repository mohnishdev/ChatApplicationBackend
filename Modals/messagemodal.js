import mongoose  from "mongoose"
const messageSchema = new mongoose.Schema({
    message :{
        text:{
            type:String
        },
        image:{
            type:String
        }
    },
        users:Array,
        sender :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("messages", messageSchema)
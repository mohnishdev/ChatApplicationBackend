import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import  mongoose  from "mongoose";
import cors from "cors";

dotenv.config({path:"config.env"})


import userRouter from "./Routes/userRoutes.js"
import messageRoute from "./Routes/messageRoute.js"
import conversation from "./Routes/conversationRoute.js"

const app = express();

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

// mongoose.connect(process.env.MONGO_URL)

// mongoose.connection.on("error", err =>{
//     console.log("connection failed")
// })

// mongoose.connection.on("connected", connected =>{
//     console.log("connected with database...", );
// })



// app.put("/api/:id" , uploadImage ,(req,res) =>{
//     console.log(req.body , req.params , "jhbvjhgfvhjbf");
// })


app.use("/api/auth" , userRouter)
app.use("/api" , messageRoute)
app.use("/api" , conversation)


app.use((req,res)=>{
    res.status(404).json({
        error:"bad request..."
    })
})

export default app;

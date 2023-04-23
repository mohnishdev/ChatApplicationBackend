import http from "http"
import app from "./app.js"
import dotenv from "dotenv"
import { Server, Socket } from "socket.io" 
// mailto:atlas_uri=mongodb+srv://arpit1812:arpit@1812/employees?retryWrites=true&w=majority
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8008
const httpserver = http.createServer(app)


const serverListen =  httpserver.listen(PORT, console.log("app is running", PORT))

const io =  new Server(serverListen,{
    cors:{
        origin:"http://localhost:3001",
        Credentials:true
    }
})

global.onlineUsers = new Map()
let users = []

const addUser = (userId , socketId) =>{
    // console.log(users.some((user) => user.userId !== userId)  , "log");
    !users.some((user) => user.userId === userId) && users.push({userId , socketId})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
// console.log(onlineUsers , "onlineUsersonlineUsersonlineUsers");
io.on("connection" ,  (socket) =>{
    // console.log(users , "users 1");
    global.chatSocket = socket;
    const onlineuser = users.map(value => value.userId)
    socket.on("add-user" , (userId) =>{
       if(userId !== null){   
        addUser(userId , socket.id)
        onlineUsers.set(userId, socket.id)
        io.emit("get-user" , onlineuser)
    }
    });
    socket.on("send-msg" , (data) => {
        if(data){
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            let Message 
            if(data.message){
                Message ={message : data.message , id:data.id}
            }
            else{
                Message = {id:data.id ,messageImage :data.messageImage}
            }
            socket.to(sendUserSocket).emit("msg-recieve", Message )
        }
    }
    })

    socket.on("delete-msg" , (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-delete" ,{messageId:data.deleteMessageID})
        }       
    })
    // console.log(users , "users2");
    socket.on("disconnect" , () =>{
        // console.log("disconnect user " , socket.id);
         removeUser(socket.id)
         io.emit("get-user" , onlineuser)
    })
})










// const parseData = (req, res, next) => {
//     if (req.method === 'POST') {
//         const formData = {}
//         req.on('data', data => {
 
//             // Decode and parse data
//             const parsedData =
//                 decodeURIComponent(data).split('&')
 
//             for (let data of parsedData) {
 
//                 decodedData = decodeURIComponent(
//                         data.replace(/\+/g, '%20'))
 
//                 const [key, value]
//                     = decodedData.split('=')
 
//                 // Accumulate submitted data
//                 // in an object
//                 formData[key] = value
//             }
 
//             // Attach form data in request object
//             req.body = formData
//             next()
//         })
//     } else {
//         next()
//     }
// }
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messagesRoute.js"
import  {Server}  from "socket.io";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);


mongoose.connect(process.env.MONGO_URL,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
})
.then(()=>{
    console.log(`Successfully Connected to Database`)
}).catch((err)=>{
    console.log(err.message)
});
const server  = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`)
});

const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        credentials: true,
    },
});


global.onlineUsers = new Map();

io.on("connection",(Socket)=>{
    global.chatSocket = Socket;
    Socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,Socket.id);
    });

    Socket.on("send-msg",(data)=>{
        // console.log("sendmsg" ,{data})
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            Socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    });
})
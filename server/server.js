const express = require("express");
const http = require("http");
const {Server} = require("socket.io")
const cors = require("cors")
const {v4} = require("uuid")

const PORT = 8000;


const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: "*",
        methods:["GET", "POST"],
    }
})

const room  = {}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("created-room", ()=>{
        const roomId = v4()
        socket.join(roomId);
        socket.emit("room-created",{roomId});
    })
    socket.on("entered-room",(roomId)=>{
        console.log(`user entered the room ${roomId[0]}`)
        socket.join(roomId[0])
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
  });

server.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
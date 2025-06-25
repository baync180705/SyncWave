import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app: Application = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const occupiedRooms = new Set();

const server = http.createServer();
const io = new SocketIOServer(server, {
    cors:{
        origin:"*",
        methods:['GET', 'POST'],
    }
})

io.on('connection', (socket)=>{
    console.log(`${socket.id} Connected`);

    socket.on("disconnect", ()=>{
        console.log(`${socket.id} Disconnected`);
    })

    socket.on("join_room", (roomID)=>{
        if (occupiedRooms.has(roomID)) socket.emit('join_room_failed', `Room: ${roomID} already exists. Try again with another ID`)
        else {
            occupiedRooms.add(roomID);
            socket.join(roomID);
            socket.emit('join_room_success', roomID);
            console.log(`User ${socket.id} has joined Room ${roomID}`)
        }
    })
})


server.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
})
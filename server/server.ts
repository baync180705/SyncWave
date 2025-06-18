import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app: Application = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

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
})

server.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
})
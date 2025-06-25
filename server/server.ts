import http from "http";
import app from "./app";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./db";
import socketConfig from "./config/socketConfig";
import socketHandlers from "./socket/socketHandlers";

connectDB();

const PORT = 5000;
const server = http.createServer(app);
const io = new SocketIOServer(server, socketConfig)

io.on('connection', (socket)=>{
    console.log(`${socket.id} Connected`);
    socketHandlers(socket);
})

server.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
})
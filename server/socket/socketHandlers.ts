const occupiedRooms = new Set();

const socketHandlers = (socket: any) => {
    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
    });

    socket.on("join_room", (roomID: string) => {
        if (occupiedRooms.has(roomID)) {
            socket.emit("join_room_failed", `Room: ${roomID} already exists. Try again with another ID`);
        } else {
            occupiedRooms.add(roomID);
            socket.join(roomID);
            socket.emit("join_room_success", roomID);
        }
    });
};

export default socketHandlers;
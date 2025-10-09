import { Room } from "../models/roomModel";

const socketHandlers = (socket: any) => {
    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
    });

    socket.on("join_or_leave_room", async ({user, roomID}: {user: string; roomID: string}) => {
        try {
            const room = await Room.findOne({roomID});

            if (room) {
                const updatedUsers = room.users;
                socket.join(roomID);
                socket.to(roomID).emit("user_list_updated", updatedUsers); // Notify others
                socket.emit("user_list_updated", updatedUsers); // Notify the user who joined
            }

            console.log(`${user} joined room ${roomID}`);
        } catch (err) {
            console.error("Error joining room:", err);
        }
    });
};

export default socketHandlers;
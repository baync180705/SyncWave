import { Room } from "../models/roomModel";
import { Track } from "../models/trackModels";

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

    socket.on("track_stream", async ({roomID}: {roomID: string})=> {
        try{
            const track = await Track.findOne({roomID});
            if (track) socket.to(roomID).emit("updated_track", track.tracks);
        }
        catch(err) {
            console.log("Error updating track", err);
        }

    })
};

export default socketHandlers;
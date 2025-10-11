import {IRoom, Room} from "../models/roomModel";

export const createRoom = async (roomID: string, user: string): Promise<IRoom> => {
    const room = new Room({roomID: roomID, users: [user]});
    return await room.save();
}

export const findRoomByID = async (roomID: string): Promise<IRoom | null> => {
    return await Room.findOne({roomID: roomID});
};

export const addUserToRoom = async (roomID: string, user: string): Promise<IRoom | null> => {
    const room: IRoom|null = await Room.findOneAndUpdate(
        {roomID: roomID},
        {$push: {users: user}},
        {new: true},
    );
    return room;
}

export const removeUserFromRoom = async (roomID: string, user: string): Promise<IRoom | null> => {
    const room: IRoom | null = await Room.findOne({ roomID: roomID });
    if (room) {
        const updatedUsers = room.users.filter((_, i) => i !== room.users.indexOf(user));
        room.users = updatedUsers;
        await room.save();
    }

    if (room){
        if(room.users.length===0){
            await deleteRoom(roomID);
        }
    }

    return room;
}

//local

const deleteRoom = async (roomID: string): Promise<IRoom | null> => {
    const room = await Room.findOne({ roomID: roomID });

    if (room && room.users.length === 0) {
        await Room.deleteOne({ roomID: roomID });
        return null; 
    }

    return room;
};
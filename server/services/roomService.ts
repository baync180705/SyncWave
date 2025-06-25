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

export const RemoveUserFromRoom = async (roomID: string, user: string): Promise<IRoom | null> => {
    const room: IRoom|null = await Room.findOneAndUpdate(
        {roomID: roomID},
        {$pop: {users: user}},
        {new: true},
    );
    return room;
}
import { Request, Response } from "express";
import { createRoom, findRoomByID, addUserToRoom, removeUserFromRoom } from "../services/roomService.ts";

export const createRoomHandler = async (req: Request, res: Response) => {
    try {
        const room = await createRoom(req.body.roomID, req.body.user);
        res.status(201).json({ success: true, room });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : `Failed to create room: ${req.body.roomID}`;
        res.status(400).json({ success: false, message: errorMessage });
    }
};

export const getRoomByIDHandler = async (req: Request, res: Response)=> {
    try {
        const room = await findRoomByID(req.params.roomID);
        if (!room) {
            res.status(404).json({ success: false, message: "Room not found" });
        }
        res.status(200).json({ success: true, room });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ success: false, message: errorMessage });
    }
};

export const addUserToRoomHandler = async (req: Request, res: Response) => {
    try{
        const room = await addUserToRoom(req.body.roomID, req.body.user);
        if (!room) {
            res.status(404).json({ success: false, message: "Room not found" });
        }
        res.status(201).json({ success: true, room });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : `Failed to join room: ${req.body.roomID}`;
        res.status(400).json({ success: false, message: errorMessage });
    }
}

export const removeUserFromRoomHandler = async(req: Request, res: Response) => {
    try{
        const room = await removeUserFromRoom(req.body.roomID, req.body.user);
        if (!room) {
            res.status(404).json({ success: false, message: "Room not found" });
        }
        res.status(201).json({ success: true, room });
    } catch (error){
        const errorMessage = error instanceof Error ? error.message : `Failed to remove from room: ${req.body.roomID}`;
        res.status(400).json({ success: false, message: errorMessage });
    }
}
import { Request, Response } from "express";
import { addMusicToTrack, removeMusicFromTrack } from "../services/trackServices";

export const addMusicToTrackHandler = async (req: Request, res: Response) => {
    try {
        const { roomID, music } = req.body;

        if (!roomID || !music) {
            res.status(400).json({ success: false, message: "roomID and music are required" });
        }

        const updatedTrack = await addMusicToTrack(roomID, music);

        if (!updatedTrack) {
            res.status(404).json({ success: false, message: "Room not found" });
        }

        res.status(201).json({ success: true, track: updatedTrack });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to add music to track";
        res.status(500).json({ success: false, message: errorMessage });
    }
};


export const removeMusicFromTrackHandler = async (req: Request, res: Response) => {
    try {
        const { roomID, music } = req.body;

        if (!roomID || !music) {
            res.status(400).json({ success: false, message: "roomID and music are required" });
        }

        const updatedTrack = await removeMusicFromTrack(roomID, music);

        if (!updatedTrack) {
            res.status(404).json({ success: false, message: "Room not found" });
        }

        res.status(200).json({ success: true, track: updatedTrack });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to remove music from track";
        res.status(500).json({ success: false, message: errorMessage });
    }
};
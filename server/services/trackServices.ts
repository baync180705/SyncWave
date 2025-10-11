import { Track, ITrack } from "../models/trackModels";

export const addMusicToTrack = async (roomID: string, music: string): Promise<ITrack | null> => {
    const updatedTrack = await Track.findOneAndUpdate(
        { roomID },
        { $addToSet: { tracks: music } },
        { new: true, upsert: true },
    );
    return updatedTrack;
};


export const removeMusicFromTrack = async (roomID: string, music: string): Promise<ITrack | null> => {
    const updatedTrack = await Track.findOneAndUpdate(
        { roomID },
        { $pull: { tracks: music } }, 
        { new: true }
    );
    return updatedTrack;

};
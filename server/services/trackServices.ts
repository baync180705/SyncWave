import { Track, ITrack } from "../models/trackModels";

export const addMusicToTrack = async (roomID: string, music: string): Promise<ITrack | null> => {
    const updatedTrack = await Track.findOneAndUpdate(
        { roomID },
        { $push: { tracks: music } },
        { new: true, upsert: true },
    );
    return updatedTrack;
};


export const removeMusicFromTrack = async (roomID: string, music: string): Promise<ITrack | null> => {
    const track = await Track.findOne({ roomID: roomID });
    if (track) {
        const updatedTracks = track.tracks.filter((_, i) => i !== track.tracks.indexOf(music));
        track.tracks = updatedTracks;
        await track.save();
    }
    return track;
};
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const addMusicToTrackService = async (roomID: string, music: string): Promise<boolean> => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/tracks/add`, {
            roomID,
            music,
        });
        
        return res.data.success;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to add music to track");
        } else if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};

export const removeMusicFromTrackService = async (roomID: string, music: string): Promise<boolean> => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/tracks/remove`, {
            roomID,
            music,
        });

        return res.data.success;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to remove music from track");
        } else if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};
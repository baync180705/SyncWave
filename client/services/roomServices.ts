import axios from "axios"

const API_BASE_URL = "http://127.0.0.1:5000"

const doesRoomExist = async (roomID: string) => {
    try {
        const isRoomRes = await axios.get(`${API_BASE_URL}/api/rooms/${roomID}`);
        const isRoom = isRoomRes.data;
        return isRoom.success;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                return false;
            }
            throw new Error(err.response?.data?.message || "Failed to check room existence");
        } else if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const createRoomService = async (roomID: string, user: string) => {
    try {
        const isRoom = await doesRoomExist(roomID);
        if(isRoom) return false;
        
        const res = await axios.post(`${API_BASE_URL}/api/rooms/create`, {
            "roomID":roomID,
            "user":user
        });

        return res.data.success;

    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to create room");
        } else if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const joinRoomService = async (roomID: string, user: string) => {
    try {
        const isRoom = doesRoomExist(roomID);
        if (!isRoom) return false;

        const res = await axios.post(`${API_BASE_URL}/api/rooms/join`, {
            "roomID":roomID,
            "user":user
        });

        return res.data.success;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to join room");
        } else if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

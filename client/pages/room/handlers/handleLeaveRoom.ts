import type { Socket } from "socket.io-client";
import { removeFromRoomService } from "../../../services/roomServices";
import type { NavigateFunction } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

interface LeavRoomHandler {
    setToastMessage: Dispatch<SetStateAction<null | string>>;
}

export const handleLeaveRoom = async (roomID: string, user: string, navigate: NavigateFunction, socket: Socket, setToastMessage: LeavRoomHandler['setToastMessage']) => {

    try{
        const res = await removeFromRoomService(roomID, user);
        if(res){
            setToastMessage("You have left the room.");

            socket.emit("join_or_leave_room", {user: user, roomID: roomID});

            navigate("/"); 
        }
        else{
            setToastMessage("Failed to leave room. Try again later !")
        }
    } catch (err) {
        setToastMessage("Failed to leave room. Try again later !");
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
      
};
import { handleCloseModal } from "./handleCloseModal";
import {joinRoomService, createRoomService} from "../../../services/roomServices";
import type { Dispatch, SetStateAction } from "react";

interface RoomState {
    user: string;
    roomID: string;
}

interface ModalHandlers {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setModalType: Dispatch<SetStateAction<"join" | "create" | null>>;
}

interface SetToastMessage {
    (message: string): void;
}

interface Navigate {
    (path: string, options: { state: RoomState }): void;
}

export const handleRoomSubmit = async (
    roomNumber: string,
    username: string,
    modalType: string | null,
    setToastMessage: SetToastMessage,
    setShowModal: ModalHandlers['setShowModal'],
    setModalType: ModalHandlers['setModalType'],
    navigate: Navigate
): Promise<void> => {
    const state: RoomState = {
        user: username,
        roomID: roomNumber
    };

    if (modalType === "create") {
        try {
            const res = await createRoomService(roomNumber, username);
            if (res) {
                setToastMessage("Room Created Successfully");

                setTimeout(() => {
                    navigate("/room", { state: state });
                }, 900);
            } else {
                setToastMessage("Room Creation Failed");
            }
        } catch (err) {
            setToastMessage("Room Creation Failed");
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

    if (modalType === "join") {
        try {
            const res = await joinRoomService(roomNumber, username);
            if (res) {
                setToastMessage("Room Joined Successfully");
                setTimeout(() => {
                    navigate("/room", { state: state });
                }, 900);
            } else {
                setToastMessage("Room Joining Failed");
            }
        } catch (err) {
            setToastMessage("Room Creation Failed");
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

    handleCloseModal(setShowModal, setModalType);
};
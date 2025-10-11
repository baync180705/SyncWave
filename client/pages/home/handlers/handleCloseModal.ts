import type { Dispatch, SetStateAction } from "react";

interface ModalHandlers {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setModalType: Dispatch<SetStateAction<"join" | "create" | null>>;
}

export const handleCloseModal = (setShowModal: ModalHandlers['setShowModal'], setModalType: ModalHandlers['setModalType']): void => {
    setShowModal(false);
    setModalType(null);
};

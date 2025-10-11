interface OpenModalHandlers {
    setModalType: (value: 'create' | 'join') => void;
    setShowModal: (value: boolean) => void;
    setToastMessage: (message: string) => void;
}

export const handleOpenModal = (
    type: 'create' | 'join',
    username: string,
    setModalType: OpenModalHandlers['setModalType'],
    setShowModal: OpenModalHandlers['setShowModal'],
    setToastMessage: OpenModalHandlers['setToastMessage']
): void => {
    if (username !== '') {
        setModalType(type);
        setShowModal(true);
    } else {
        setToastMessage('Please enter a username before proceeding');
    }
};
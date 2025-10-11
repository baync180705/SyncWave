import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { RoomNumberInputModal } from '../../components/RoomNumberInputModal';
import { Toast } from '../../components/Toast';
import { handleCloseModal } from "./handlers/handleCloseModal";
import { handleRoomSubmit } from './handlers/handleRoomSubmit';
import { handleOpenModal } from './handlers/handleOpenModal';

export const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'join' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  return (
    <div className='relative'>
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-gradient-to-br from-gray-950 via-zinc-900 to-teal-950 text-white">
        <div className={`flex flex-col bg-white/10 p-12 rounded-2xl shadow-xl backdrop-blur-md w-[36rem] h-[18rem] justify-center ${showModal ? 'blur-lg' : ''}`}>
            <div className="flex flex-col w-full space-y-4">
            <label htmlFor="username" className="text-2xl font-semibold tracking-wide text-white">
                Enter your username
            </label>
            <input
                id="username"
                type="text"
                className="px-4 py-3 rounded-md w-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-md"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="on"
            />
            </div>
        </div>

        <div className={`flex gap-10 mt-16 ${showModal ? 'blur-sm' : ''}`}>
            <div
            className="w-60 h-60 bg-white/20 rounded-full backdrop-blur-lg hover:bg-white/30 transition flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => handleOpenModal('create', username, setModalType, setShowModal, setToastMessage)}
            >
            <PlusCircleIcon className="h-16 w-16 text-white mb-4" />
            <span className="text-xl font-semibold">Create Room</span>
            </div>

            <div
            className="w-60 h-60 bg-white/20 rounded-full backdrop-blur-lg hover:bg-white/30 transition flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => handleOpenModal('join', username, setModalType, setShowModal, setToastMessage)}
            >
            <ArrowRightCircleIcon className="h-16 w-16 text-white mb-4" />
            <span className="text-xl font-semibold">Join Room</span>
            </div>
        </div>

        {showModal && (
            <RoomNumberInputModal onClose={()=>handleCloseModal(setShowModal, setModalType)} onSubmit={(roomID)=>handleRoomSubmit(roomID, username, modalType, setToastMessage, setShowModal, setModalType, navigate)} />
        )}
        </div>
        {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};

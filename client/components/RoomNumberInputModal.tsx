import React, { useRef } from 'react';

interface RoomNumberInputModalProps {
  onClose: () => void;
  onSubmit: (roomNumber: string) => void;
}

export const RoomNumberInputModal: React.FC<RoomNumberInputModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const [roomNumber, setRoomNumber] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setRoomNumber(value);
    }
  };

  const handleSubmit = () => {
    if (roomNumber.length === 6) {
      onSubmit(roomNumber);
    } else {
      alert('Room number must be exactly 6 digits');
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="flex flex-col bg-white/10 p-12 rounded-2xl shadow-xl backdrop-blur-md w-[28rem] text-white">
        <h2 className="text-2xl font-semibold tracking-wide">Enter Room Number</h2>
        <p className="text-sm text-white/80 mt-2">Room number must be a 6-digit numeric code.</p>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={roomNumber}
          onChange={handleChange}
          className="mt-4 px-4 py-3 rounded-md w-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-md text-center tracking-widest text-xl"
          placeholder="- - - - - -"
        />
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 text-red-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-pink-500 text-green-600 hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

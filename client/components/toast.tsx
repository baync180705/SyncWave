import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in fade-out">
      <div className="px-6 py-4 rounded-lg shadow-lg backdrop-blur-md bg-white/20 text-white border border-white/30">
        <span className="text-sm font-medium text-white-900">{message}</span>
      </div>
    </div>
  );
};

import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

interface MusicQueueProps {
  queue: string[];
  onRemoveMusic: (music: string) => void; // Add the prop for the remove function
}

export const MusicQueue: React.FC<MusicQueueProps> = ({ queue, onRemoveMusic }) => {
  return (
    <ul className="space-y-2">
      {queue.length > 0 ? (
        queue.map((music, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 p-2 rounded-md shadow-md"
          >
            <span className="text-white">{music}</span>
            <button
              onClick={() => onRemoveMusic(music)} // Call the remove function
              className="text-red-500 hover:text-red-700 transition"
            >
              <TrashIcon className="h-5 w-5" /> {/* HeroIcons Trash Icon */}
            </button>
          </li>
        ))
      ) : (
        <li className="text-gray-400">No music in the queue</li>
      )}
    </ul>
  );
};
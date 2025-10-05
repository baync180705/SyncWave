import React from "react";

interface MusicQueueProps {
  queue: string[];
}

export const MusicQueue: React.FC<MusicQueueProps> = ({ queue }) => {
  return (
    <ul className="space-y-2">
      {queue.length > 0 ? (
        queue.map((track, index) => (
          <li
            key={index}
            className="px-4 py-2 bg-white/20 rounded-md text-white shadow-sm"
          >
            {track}
          </li>
        ))
      ) : (
        <li className="text-gray-400">No music in the queue</li>
      )}
    </ul>
  );
};
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toast } from "../components/Toast";
import { MemberList } from "../components/MemberList";
import { MusicQueue } from "../components/MusicQueue";
import { useSocket } from "../hooks/useSocket";
import { removeFromRoomService } from "../services/roomServices";
import { addMusicToTrackService, removeMusicFromTrackService } from "../services/trackServices";

export const Room: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]); 
  const [queue, setQueue] = useState<string[]>([]); 

  const navigate = useNavigate();
  const location = useLocation();

  const {user, roomID} = location.state || {};

  const socket = useSocket();

  useEffect(() => {

    if (!user || !roomID) {
      console.error("User or RoomID is undefined. Redirecting to Home.");
      navigate("/");
      return;
    }
    
    socket.emit("join_or_leave_room", {user: user, roomID: roomID});
    socket.on("user_list_updated", (userList: string[])=>{
      setMembers(userList);
    })

    socket.on("updated_track", (trackList: string[])=>{
      setQueue(trackList);
    })

    return () => {
      socket.off("user_list_updated");
    };
  }, [navigate, roomID, socket, user]);

  const handleLeaveRoom = async () => {

    setTimeout(async () => {

      try{
        const res = await removeFromRoomService(roomID, user);
        if(res){
          setToastMessage("You have left the room.");

          socket.emit("join_or_leave_room", {user: user, roomID: roomID});

          navigate("/"); // Redirect to Home page
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
      

    }, 900);
  };

  const handleAddMusic = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {

      const allowedMimeTypes = [
        "audio/mpeg", "audio/aac", "audio/flac", "audio/alac",
        "audio/wav", "audio/x-wav", "audio/aiff", "audio/x-aiff"
      ];

      const allowedExtensions = ["mp3", "aac", "flac", "alac", "wav", "aiff"];

      const file = event.target.files[0];

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if(allowedMimeTypes.includes(file.type) && fileExtension && allowedExtensions.includes(fileExtension)){

        try{
          const res = await addMusicToTrackService(roomID, file.name);
          if(res){
            setQueue((prevQueue) => [...prevQueue, file.name]); 
            setToastMessage(`${file.name} added to the queue.`);
            socket.emit("track_stream", {roomID: roomID});
          }
        }catch(err){
          setToastMessage("Failed to add music to track. Try again later !");
          if (err instanceof Error) {
              throw new Error(err.message);
          } else {
              throw new Error("An unknown error occurred");
          }
        }

      }else{
        setToastMessage("Invalid File Format ! Please try again.");
      }
    }
  };

  const handleRemoveMusic = async (music: string) => {
    try {
      const res = await removeMusicFromTrackService(roomID, music);
      if (res) {
        setQueue((prevQueue) => prevQueue.filter((_,i) => i !== prevQueue.indexOf(music))); 
        setToastMessage(`${music} removed from the queue.`);
        socket.emit("track_stream", { roomID: roomID }); 
      }
    } catch (err) {
      setToastMessage("Failed to remove music from track. Try again later!");
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col h-screen w-screen justify-center items-center bg-gradient-to-br from-gray-950 via-zinc-900 to-teal-950 text-white">
        <div className="flex flex-col bg-white/10 p-12 rounded-2xl shadow-xl backdrop-blur-md w-[48rem] h-[32rem]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Room</h1>
            <button
              onClick={handleLeaveRoom}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Leave Room
            </button>
          </div>

          <div className="flex flex-row gap-8">
            {/* Member List */}
            <div className="flex flex-col w-1/3 bg-white/10 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Members</h2>
              <MemberList members={members} />
            </div>

            {/* Music Queue */}
            <div className="flex flex-col w-2/3 bg-white/10 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Music Queue</h2>
              <MusicQueue queue={queue} onRemoveMusic={handleRemoveMusic}/>
              <label
                htmlFor="add-music"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer text-center"
              >
                Add Music
              </label>
              <input
                id="add-music"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleAddMusic}
              />
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
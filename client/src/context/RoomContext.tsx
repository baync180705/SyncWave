import { createContext, useEffect, useState } from "react";
import SocketIOClient from "socket.io-client"
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 } from "uuid";

const URL = "http://localhost:8000";

export const RoomContext = createContext<null | any>(null)
const ws = SocketIOClient(URL)

export const RoomProvider = ({children}: any) =>{
    const navigate = useNavigate()
    const [selfId, setSelfId] = useState<Peer>()
    const enterRoom = ({roomId}:any)=>{
        console.log(roomId)
        navigate(`/room/${roomId}`)
    }

    useEffect(()=>{
        const meId = v4()
        const peer = new Peer(meId) 
        setSelfId(peer)
        ws.on("room-created", enterRoom)
    })
    return(
        <RoomContext.Provider value={{ws, selfId}}>
            {children}
        </RoomContext.Provider>
    )
}

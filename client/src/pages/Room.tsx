// import socketIO from "socket.io-client";
import {useEffect } from "react";

import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"
import { useParams } from "react-router-dom";


export const Room = () => {
  const {ws, selfId} = useContext(RoomContext)
  const {id} = useParams()
  console.log(id)
    useEffect(()=>{
      ws.emit("entered-room",[id, selfId])
    },[id])
    const displayName = localStorage.getItem("username")

    // useEffect(()=>{
    //   socketIO(URL)
    // },[]);
  return (
    <>
        <h2>Welcome {displayName} to room {id}</h2>
    </>
  )
}



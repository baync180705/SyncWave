import { ChangeEvent, FormEvent, useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import { RoomContext } from "../context/RoomContext";

export const Home = () => {
    const {ws} = useContext(RoomContext);
    const navigate = useNavigate()
    interface createRoomModel {
        "username": string,
    }

    const [createRoomStatus, setCreateRoomStatus] = useState<boolean>(false)
    const [joinRoomStatus, setJoinRoomStatus] = useState<boolean>(false)
    
    const[createRoomData, setCreateRoomData] = useState<createRoomModel>({username:""})

    const handleChangeCreate = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCreateRoomData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmitCreate = (event: FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      localStorage.setItem("username",createRoomData.username)
        console.log("a")
        console.log("hello")
        ws.emit("created-room");
      
    }

    return (
      <>
        <button onClick={()=>{setCreateRoomStatus(true)}}>Create Room</button>
        <button onClick={()=>{setJoinRoomStatus(true)}}>Join Room</button>
        {createRoomStatus && 
            <form onSubmit={handleSubmitCreate}>
                <input
                    name = "username"
                    placeholder="Enter Display Name"
                    value={createRoomData.username}
                    onChange={handleChangeCreate}
                />

                <button type="submit">Create Room!</button>
                <button onClick={()=>setCreateRoomStatus(false)}>Cancel</button>
            </form>
        }
      </>
    )
  }


import { useEffect, useState } from "react"
import Avatar from "./Avatar"
import { useRoomContext } from "../contexts/RoomContext"
import { getRoom as getRoomService } from "../api/services/roomServices"
import { toast } from "react-toastify"
import { socket } from '../socket'
import { useNavigate } from "react-router-dom"
const PresenceList = ({ users,leaveRoom }) => {
    const { activeRoom } = useRoomContext()
    const [room, setRoom] = useState('')
    const navigate = useNavigate('')
    const copyRoomId = async () => {
        await navigator.clipboard.writeText(room._id)
        toast('Copied RoomID to Clipboard', {
            type: 'success'
        })
    }
    useEffect(() => {
        const getRoom = async () => {
            const data = await getRoomService(activeRoom)
            setRoom(data.room)
        }
        getRoom()
    }, [activeRoom])
    return (
        <div className="w-full h-full flex flex-col gap-2 p-1 border-1 border-gray-300 bg-blue-50 justify-center items-center">
            <div className=" flex flex-col gap-3 border-b-1 border-gray-300">
                <h1 className="text-slate-800 text-sm text-center">Room : {room.name}</h1>
                <button className="btn btn-primary h-10 w-fit p-2 text-xs text-white" onClick={copyRoomId}><span><img className="w-fit h-fit" src="https://img.icons8.com/?size=30&id=86206&format=png&color=F2F7F5"></img></span>Copy RoomId</button>
                <h1 className="text-lg text-center">Participants</h1>
            </div>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="flex gap-2 flex-wrap ">
                    {
                        users.map((user, index) => {
                            return <Avatar key={Date.now() + index} user={user} />
                        })
                    }
                </div>
                <div>
                    <button onClick={leaveRoom} className="btn btn-secondary h-10 text-xs mb-2">Leave Room</button>
                </div>
            </div>

        </div>

    )
}
export default PresenceList
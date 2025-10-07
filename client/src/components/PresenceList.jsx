import { useEffect, useState } from "react"
import Avatar from "./Avatar"
import { useRoomContext } from "../contexts/RoomContext"
import { getRoom as getRoomService} from "../api/services/roomServices"
import { toast } from "react-toastify"

const PresenceList = ({ users }) => {
    const { activeRoom } = useRoomContext()
    const [room,setRoom] = useState('')
    const copyRoomId = async()=>{
        await navigator.clipboard.writeText(room._id)
        toast('Copied RoomID to Clipboard',{
            type:'success'
        })
    }
    useEffect(() => {
        const getRoom = async()=>{
            const data = await getRoomService(activeRoom)
            setRoom(data.room)
        }
        getRoom()
    }, [activeRoom])
    return (
        <div className="w-full h-full flex flex-col gap-2 p-1 border-1 border-gray-300 bg-blue-50">
            <div className=" flex flex-col gap-3 border-b-1 border-gray-300">
                <h1 className="text-slate-800 font-bold">Room : {room.name}</h1>
                <button className="btn btn-secondary" onClick={copyRoomId}>Copy RoomId</button>
                <h1 className="text-lg text-center">Participants</h1>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
                {
                    users.map((user, index) => {
                        return <Avatar key={Date.now() + index} user={user} />
                    })
                }
            </div>

        </div>

    )
}
export default PresenceList
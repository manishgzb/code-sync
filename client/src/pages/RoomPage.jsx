import { useState } from "react"
import Button from "../components/Button"
import RoomForm from "../components/RoomForm"
import { socket } from "../socket"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../contexts/SocketContext"
import axiosInstance from "../api/axiosInstance"
import { createRoom as createRoomService } from "../api/services/roomServices"
import { useRoomContext } from "../contexts/RoomContext"
import { useAuthContext } from "../contexts/AuthContext"

const RoomPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [roomId, setRoomId] = useState('')
    const [roomName, setRoomName] = useState('')
    const { activeRoom, setActiveRoom } = useRoomContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const createRoom = async () => {
        try {
            const data = await createRoomService(roomName)
            window.alert(`created room ${data.room.name} ${data.room.id}  `)
        } catch (err) {
            window.alert(err.message)
        }

    }
    const joinRoom = () => {
        socket.auth = { roomId: roomId, user: user }
        socket.connect()
        localStorage.setItem('activeRoom', roomId)
        setActiveRoom(roomId)
        navigate("/editor")

    }
    const handleCreateRoomSubmit = (e) => {
        e.preventDefault()
        createRoom()
    }
    const handleJoinRoomSubmit = (e) => {
        e.preventDefault()
        if (!roomId) return
        joinRoom()
    }
    if (showCreateForm) {
        return <RoomForm inputLabel={'Enter room name'} buttonLabel={'Create Room'} value={roomName} setValue={setRoomName} onSubmit={handleCreateRoomSubmit}></RoomForm>
    } if (showJoinForm) {
        return <RoomForm inputLabel={'Enter room Id'} buttonLabel={'Join Room'} value={roomId} setValue={setRoomId} onSubmit={handleJoinRoomSubmit}></RoomForm>
    }
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen w-full">
            <div>
                <h1>Welcome, Manish</h1>
            </div>
            <div className="flex flex-col gap-5">
                <Button label={'Join Room'} color={'btn-primary'} ht={'10'} wt={'56'} onClick={() => setShowJoinForm(true)}></Button>
                <Button label={'Create Room'} color={'btn-secondary'} ht={'10'} wt={'56'} onClick={() => setShowCreateForm(true)}></Button>
            </div>
        </div>
    )
}
export default RoomPage
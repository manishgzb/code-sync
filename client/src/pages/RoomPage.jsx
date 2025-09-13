import { useState } from "react"
import Button from "../components/Button"
import RoomForm from "../components/RoomForm"
import { socket } from "../socket"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../contexts/SocketContext"
import axiosInstance from "../api/axiosInstance"

const RoomPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showJoinForm, setShowJoinForm] = useState(false)
    const [roomId, setRoomId] = useState('')
    const navigate = useNavigate()

    const createRoom = async () => {

    }
    const joinRoom = () => {
        socket.auth = { roomId: 'room1' }
        socket.connect()
        navigate("/editor")

    }
    const handleCreateRoomSubmit = (e) => {
        e.preventDefault()
        createRoom()
    }
    const handleJoinRoomSubmit = (e) => {
        e.preventDefault()
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
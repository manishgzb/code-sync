import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { socket } from "../socket"
import { useRoomContext } from "../contexts/RoomContext"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { toast, ToastContainer } from "react-toastify"

const JoinRoomPage = () => {
    const [roomId, setRoomId] = useState('')
    const { setActiveRoom } = useRoomContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        setLoading(false)
        e.preventDefault()
        if (!roomId) return
        joinRoom()
    }
    const joinRoom = () => {
        socket.auth = { roomId: roomId, user: user }
        socket.connect()
        localStorage.setItem('activeRoom', roomId)
        setActiveRoom(roomId)
        navigate("/editor")
    }
    return (
        <>
            <ToastContainer />
            <Header />
            <div className="relative flex-grow flex items-center justify-center z-10">
                <div className="w-full max-w-md p-8 space-y-6 bg-card-light dark:bg-card-dark rounded-xl shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
                            Join a Room
                        </h2>
                        <p className="mt-2 text-md text-subtext-light dark:text-subtext-dark">
                            Enter the details below to join an existing session.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                className="block text-sm font-medium text-subtext-light dark:text-subtext-dark"
                                htmlFor="room-id"
                            >
                                Room ID
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className=" text-subtext-light dark:text-subtext-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z" /></svg>
                                    </span>
                                </div>
                                <input
                                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark pl-10 focus:border-primary focus:ring-primary sm:text-sm py-3"
                                    placeholder="Enter Room ID"
                                    type="text"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-card-light dark:focus:ring-offset-card-dark transition-transform transform hover:scale-105"
                                type="submit"
                            >
                                <span className="pointer-events-none mr-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg></span>
                                Join
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to={"/room"} className="font-medium text-primary hover:text-opacity-80" href="#">
                            <span className="inline-flex items-center">
                                <span className="material-symbols-outlined mr-1"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></span>
                                Back to Welcome Screen
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default JoinRoomPage
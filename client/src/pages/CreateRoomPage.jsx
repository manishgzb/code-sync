import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { toast,ToastContainer } from "react-toastify"
import { createRoom as createRoomService} from "../api/services/roomServices"
import Loading from "../components/Loading"

const CreateRoomPage = () => {
    const [roomName, setRoomName] = useState('')
    const [loading,setLoading] = useState(false)

    const createRoom = async () => {
        setLoading(true)
        try {
            const data = await createRoomService(roomName)
            setLoading(false)
            toast(`created room ${data.room.name} ${data.room.id}  `,{
                type:'success'
            })
        } catch (err) {
            setLoading(false)
            toast(err.message)
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        createRoom()
    }
    return (
        <>
        <ToastContainer/>
            <Header />
            {
                loading && <Loading/>
            }
            <div className="relative flex-grow flex items-center justify-center z-10 m-5" >
                <div className="w-full max-w-md p-8 space-y-6 bg-card-light dark:bg-card-dark rounded-xl shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">Create a Room</h2>
                        <p className="mt-2 text-md text-subtext-light dark:text-subtext-dark">Fill in the details to start a new coding session.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark" htmlFor="room-name">Room Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-subtext-light dark:text-subtext-dark"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm160-640v560-560Zm160 320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-200h240v-560H280v560Z" /></svg></span>
                                </div>
                                <input value={roomName} onChange={(e) => setRoomName(e.target.value)} className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark pl-10 focus:border-primary focus:ring-primary sm:text-sm py-3" id="room-name" name="room-name" placeholder="Enter a room name" type="text" />
                            </div>
                        </div>
                        <div>
                            <button className="group mt-5 relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-card-light dark:focus:ring-offset-card-dark transition-transform transform hover:scale-105" type="submit">
                                <span className="mr-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
                                Create Room
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <a className="font-medium text-primary hover:text-opacity-80" href="#">
                            <span className="inline-flex items-center">
                                <span className="mr-1">arrow_back</span>
                                Back to Welcome Screen
                            </span>
                        </a>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}
export default CreateRoomPage
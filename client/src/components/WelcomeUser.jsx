import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const WelcomeUser = () => {
    const {user} = useAuthContext()
    return (
        <div className="flex-grow flex items-center justify-center m-10">
            <div className="w-full max-w-md p-8 space-y-8 bg-card-light dark:bg-card-dark rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
                        Welcome, {user.name}
                    </h2>
                    <p className="mt-2 text-md text-subtext-light dark:text-subtext-dark">
                        Connect and collaborate with your team in real-time.
                    </p>
                </div>
                <div className="space-y-6">
                    <Link to={'/room/join'} className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-card-light dark:focus:ring-offset-card-dark transition-transform transform hover:scale-105">
                        <span className="material-symbols-outlined mr-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm160-640v560-560Zm160 320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-200h240v-560H280v560Z" /></svg></span>
                        Join Room
                    </Link>
                    <Link to={'/room/create'} className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-card-light dark:focus:ring-offset-card-dark transition-transform transform hover:scale-105">
                        <span className="material-symbols-outlined mr-3"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg></span>
                        Create Room
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default WelcomeUser
import { useAuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
const Header = () => {
    const { user,logout } = useAuthContext()
    const handleLogOutClick = ()=>{
        logout()
    }

    return (
        <div>
            <header className="border-b-2 border-dashed border-gray-300 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
                    <Link to={'/'} className="flex items-center gap-4">
                        <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 14l-4 4m0 0l4-4m-4 4h14m-5-4l4-4m0 0l-4-4m4 4H5" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Code-Sync
                        </h2>
                    </Link>

                    <div className="flex items-center gap-2">
                        {
                            !user ? <>
                                <Link to={'/login'} className="rounded border border-gray-400 px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100">
                                    Login
                                </Link>
                                <Link to={'/signup'} className="rounded bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">
                                    Sign Up
                                </Link>
                            </> :
                                <>
                                    <button onClick={handleLogOutClick} className="rounded bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">
                                        Logout
                                    </button>
                                </>
                        }
                    </div>

                </div>
            </header>
        </div>
    )
}
export default Header
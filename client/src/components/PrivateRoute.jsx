import { useAuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const { user } = useAuthContext()
    if (!user) {
       return <Navigate to={'/login'}/>
    }
    return (
        children
    )
}
export default PrivateRoute
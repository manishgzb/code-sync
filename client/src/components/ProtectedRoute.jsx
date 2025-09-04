import useAuthContext from '../contexts/AuthContext'
const ProtectedRoute = ({children})=>{
    const {user} = useAuthContext()
    if(user){
        return {children}
    }
    return(
        <h1>Please login</h1>
    )
}
export default ProtectedRoute
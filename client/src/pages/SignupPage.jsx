import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import handleError from "../hooks/errorHandler"
function SignupPage() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    const signUp = async () => {
        try {
            const res = await axiosInstance.post('/auth/signup',{
                name:name,
                email:email,
                password:password
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col gap-5 items-center w-full'>
            <h1 className='text-center'>Welcome , Register</h1>
            <label className="floating-label">
                <span>Your Name</span>
                <input type="text" placeholder="xyz"
                    value={name} onChange={(e) => {
                        setname(e.target.value)
                    }}
                    className="input input-md" />
            </label>
            <label className="floating-label">
                <span>Your Email</span>
                <input type="text" placeholder="mail@site.com"
                    value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }}
                    className="input input-md" />
            </label>
            <label className="floating-label">
                <span>Your Password</span>
                <input type="password"
                    value={password} onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                    placeholder="*******" className="input input-md" />
            </label>
            <div className='flex flex-col items-center gap-3'>
                <button onClick={signUp} className='btn btn-primary '>Sign Up</button>
                <p>Or</p>
                <Link to="/login" className='btn btn-secondary'>Login</Link>
            </div>
        </div>
    )
}
export default SignupPage
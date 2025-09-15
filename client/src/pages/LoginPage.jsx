import { useState } from 'react'
import '../style.css'
import { useAuthContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
     const { login } = useAuthContext()
     const navigate = useNavigate()
    return (
        <div className='flex flex-col pl-6 pb-6 pr-6 pt-10 gap-5 items-center w-full'>
            <h1 className='text-center text-xl'>Welcome back , Log In</h1>
            <label className="floating-label w-full lg:w-70">
                <span>Your Email</span>
                <input type="text" placeholder="mail@site.com"
                    value={email}
                    onChange={(e) => {
                        setemail(e.target.value)
                    }}
                    className="input input-xl w-full lg:w-70 lg:input-md " />
            </label>
            <label className="floating-label w-full lg:w-70">
                <span>Your Password</span>
                <input type="password" placeholder="*******"
                    value={password}
                    onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                    className="input input-xl w-full lg:input-md lg:w-70" />
                {/* {
                    error ? <p className="label text-warning">error</p>:null
                } */}

            </label>
            <div className='flex flex-col items-center gap-3 w-full'>
                <button onClick={async() => {
                    await login(email, password)
                    navigate("/room")
                }} className='btn btn-primary h-12 lg:h-10 w-full lg:w-70 rounded-3xl '>Log In</button>
                <p>Or</p>
                <Link to="/signup" className='btn btn-secondary h-12 lg:h-10 w-full lg:w-70 rounded-3xl'>Sign Up</Link>
            </div>
        </div>

    )
}
export default LoginPage
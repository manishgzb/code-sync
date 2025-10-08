import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { toast, ToastContainer } from "react-toastify"
import Loading from "../components/Loading"
function SignupPage() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const signUp = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.post('/auth/signup',{
                name:name,
                email:email,
                password:password
            })
            toast(res.data.message,{
                type:'success'
            })
        } catch (err) {
            let errmsg = ''
            if(err.response){
                errmsg = err.response.data.message
            }else if(err.request){
                errmsg = 'No response from server'
            }else{
                errmsg = err.message
            }
            toast(errmsg,{
                type:'error'
            })
        }
        setLoading(false)
    }
    return (
        <>
        <ToastContainer/>
        <Header/>
        {
            loading && <Loading/>
        }
        <div className='flex flex-col pl-6 pb-6 pr-6 pt-10 gap-5 items-center w-full'>
            <h1 className='text-center text-xl'>Welcome , Register</h1>
            <label className="floating-label w-full lg:w-70">
                <span>Your Name</span>
                <input type="text" placeholder="xyz"
                    value={name} onChange={(e) => {
                        setname(e.target.value)
                    }}
                    className="input input-xl w-full lg:w-70 lg:input-md" />
            </label>
            <label className="floating-label w-full lg:w-70">
                <span>Your Email</span>
                <input type="text" placeholder="mail@site.com"
                    value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }}
                    className="input input-xl w-full lg:input-md lg:w-70" />
            </label>
            <label className="floating-label">
                <span>Your Password</span>
                <input type="password"
                    value={password} onChange={(e) => {
                        setpassword(e.target.value)
                    }}
                    placeholder="*******" className="input input-xl w-full lg:input-md lg:w-70" />
            </label>
            <div className='flex flex-col items-center gap-3 w-full'>
                <button onClick={signUp} className='btn btn-primary h-12 lg:h-10 w-full lg:w-70 rounded-lg'>Sign Up</button>
                <p>Or</p>
                <Link to="/login" className='btn btn-secondary h-12 lg:h-10 w-full lg:w-70 rounded-lg'>Login</Link>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default SignupPage
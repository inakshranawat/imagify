import React, { useEffect, useState } from 'react'
import {assets} from "../assets/assets.js"
import { useAppContext } from '../context/useContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setState] = useState('Sign Up')
    const {setShowLogin,setToken,setUser,backendUrl} = useAppContext()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e)=>{
      e.preventDefault()
      try {
        if(state === "Login"){
          const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
          if(data.success){
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('token', data.token)
            setShowLogin(null)

          }else{
            toast.error(data.message)
          }
        }else{
          const {data} = await axios.post(backendUrl + "/api/user/register", {name,email,password})
          if(data.success){
            setToken(data.token)
            setShowLogin(null)
            localStorage.setItem("token", data.token)
            setUser(data.user)

          }else{
             toast.error(data.message)
          }
        }
        
      } catch (error) {
        toast.error(error.message)
        
      }

    }


    useEffect(() => {
        document.body.style.overflow = "hidden"

        return ()=>{
            document.body.style.overflow = "unset"
        }
     
    }, [])
    
  return (
    <>
      <div className='fixed  top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center '>
          <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 ' >
             <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

             <p className='text-sm'>Welcome back ! Please sign in to continue </p>
             {state != "Login" && 
             <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img width={20} src={assets.profile_icon} alt="" />
                <input value={name} onChange={(e)=> setName(e.target.value)} className='outline-none ' type="text" placeholder='Full Name' required />
             </div>}

              <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img width={20} src={assets.email_icon} alt="" />
                <input value={email} onChange={(e)=> setEmail(e.target.value)} className='outline-none ' type="email" placeholder='Email' required />
             </div>

              <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img width={20} src={assets.lock_icon} alt="" />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} className='outline-none ' type="password" placeholder='Password' required />
             </div>

             <p className='text-blue-600 cursor-pointer my-4 '>Forgot password ? </p>

             <button className='bg-blue-500 py-2 text-white  cursor-pointer w-full rounded-full '> {state === "Login" ? "Login": "create account "}</button>
              
             {state === "Login" ? 
             <p onClick={()=> setState("Sign Up")} className='text-center mt-5'>Don't have an account? <span className='text-blue-500 cursor-pointer'>Sign Up</span></p>:
             
             <p onClick={()=> setState("Login")} className='text-center mt-5'>Already have an account ? <span className='text-blue-500 cursor-pointer'>Login</span></p>}

             <img onClick={()=> setShowLogin(false)} className='absolute right-5 top-5 cursor-pointer'  src={assets.cross_icon} alt="" />
          </form>
      </div>
    </>
  )
}

export default Login

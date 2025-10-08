import { useState ,useEffect } from "react";
import { AppContext } from "./AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const AppContextProvider = ({children})=>{
    
   const backendUrl = import.meta.env.VITE_BACKENDURL

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credits, setCredits] = useState(null)

    const loadCreditsData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits',{headers:{token}})
            if(data.success){
                setCredits(data.credits)
                setUser(data.user)

            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

     const generateImage = async (prompt)=>{
        try {
             const {data} = await axios.post(backendUrl + '/api/image/generate-image',{prompt},{headers:{token}})
             if(data.success){
                loadCreditsData()
                return data.resultImage
             }else{
                toast.error(data.message)
                loadCreditsData()
                if(data.creditBalance === 0|| credits === 0){
                    navigate('/buy')
                }
             }
            
        } catch (error) {
            toast.error(error.message)
            
        }
     }
     const logout =  ()=>{
        localStorage.removeItem('token')
        setUser(null)
        setToken('')

     }
    useEffect(() => {
        if(token){
           loadCreditsData()
        }
     
    }, [token])
    

    const value = {
      user,setUser, showLogin , setShowLogin, token , setToken, credits, setCredits , loadCreditsData , logout ,generateImage, backendUrl
    }

    return (
        
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

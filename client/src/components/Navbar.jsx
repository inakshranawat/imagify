
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useContext.jsx'


const Navbar = () => {
    const navigate  = useNavigate()
    const {user,setShowLogin,logout,credits} = useAppContext()
    
    
  return (
    <> 
     <div className='flex items-center justify-between py-4'>
         <img onClick={()=> navigate('/')} className='w-28 lg:w-40' src={assets.logo} alt="" />

        <div>
            {user ?
            <div className='flex items-center gap-4'>
                <button onClick={()=>navigate('/buy')} className='flex items-center gap-3 bg-blue-100 px-4 py-1.5 rounded-full  hover:scale-105 transition-all duration-500 '>
                    <img src={assets.credit_star} alt="" />
                    <p>Credit left: {credits} </p>
                </button>
                <p>Hii , {user.name} </p>
                <div className='relative group'>
                    <img className='w-10 drop-shadow' src={assets.profile_icon} alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                        <ul>
                            <li className='cursor-pointer' onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            :
            <div className='flex items-center gap-5'>
              <p onClick={()=> navigate('/buy')} className='cursor-pointer '>Pricing</p>
              <button onClick={()=> setShowLogin(true)} className='bg-zinc-800 text-white  px-7 py-2  cursor-pointer  text-sm rounded-full '>Login</button>
            </div>
                }
        </div>
     </div>
    </>
  )
}

export default Navbar


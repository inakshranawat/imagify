import React from 'react'
import { assets } from '../assets/assets'
import Login from './Login'
import { useAppContext } from '../context/useContext'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user,setShowLogin} = useAppContext()
  const navigate = useNavigate()
  


  const onClickHandler = ()=>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }
  
  return (
    <>
      <motion.div className='flex items-center justify-center flex-col text-center my-20'
        initial ={{opacity:0.2 , y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once: true}}
      >

         <motion.div className='text-center inline-flex text-stone-500 gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 0'
          initial={{opacity:0, y:-20}}
          animate={{opacity:1 , y:0}}
          viewport={{once: true}}
          transition={{delay:0.2, duration:0.8}}
         >
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="" />
         </motion.div>

         <motion.h1 className='text-7xl mx-auto mt-10 text-center  max-w-[590px] '>Turn Text to <span className='text-blue-800'
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.4 , duration:2}}
         >image</span>, in seconds</motion.h1>

         <motion.p className='text-center max-w-xl mt-5'
          initial={{opacity:0 , y:20}}
          animate={{opacity:1 , y:0}}
          transition={{delay:0.6 , duration:0.8}}
         >Unleash your creativity with AI. Turn your imagination into the visuals art in seconds - just type, and watch the magic happen </motion.p>

         <motion.button onClick={onClickHandler} className='px-12 py-2.5 cursor-pointer bg-black text-center mt-8 text-white flex items-center gap-2 rounded-full '
           whileHover={{scale:1.05}}
           whileTap={{scale:0.95}}
           initial={{opacity:0}}
           animate={{opacity:1}}
           transition={{default:{duration:0.5},opacity:{delay:0.8 , duration:1}}}
          >
            Generate Images
            <img className='h-6' src={assets.star_group} alt="" />
         </motion.button>

         <div  className='flex items-center justify-center gap-4 mt-16'>
           {Array(6).fill('').map((item,index)=>{
             return (
              <div key={index} >
                 <img className='w-20 h-20 rounded-md hover:scale-105 transition-all duration-200 cursor-pointer  ' src={index % 2 ===0 ? assets.sample_img_1 : assets.sample_img_2} alt="" />
              </div>
             )
           })}
         </div>

         <p className='text-neutral-600  mt-2 '>Generated images from imagify</p>
      </motion.div>
    </>
  )
}

export default Header

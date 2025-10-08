import React, { useState } from 'react'
import {assets} from "../assets/assets.js"
import { motion } from 'framer-motion'
import {useAppContext} from '../context/useContext.jsx'

const Result = () => {

  const {generateImage} = useAppContext()

   const [image, setImage] = useState(assets.sample_img_1)
   const [isImageLoaded, setIsImageLoaded] = useState(null)
   const [loading , setLoading ] = useState(null)
   const [input, setInput] = useState("")

   const onSubmitHandler = async  (e)=>{
    e.preventDefault()
    setLoading(true)
    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(null)

   }
  return (
    <>
    <motion.form
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1 , y:0}}
      viewport={{once: true}}
    onSubmit={onSubmitHandler} className='flex flex-col items-center justify-center min-h-[90vh] '>

      <div>
         <div className='relative'>
          <img className='w-80 rounded '  src={image} alt="" /> 
          <span className={` absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? " w-full transition-all duration-[10s]  ": 'w-0'} `}></span>
         </div>
         <p className={!loading ? "hidden": ""}>Loading.....</p>
      </div>
      {!isImageLoaded && 
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full '>
        <input value={input} onChange={(e)=>{setInput(e.target.value)}} className='flex-1 outline-none bg-transparent ml-8 ' type="text" placeholder='Describe what you want to generate ' />
        <button className='rounded-full bg-zinc-900 py-3 px-10  ' type='submit'>Generate</button>
      </div>}
      {isImageLoaded && 
      <div className='flex items-center justify-center gap-2 p-0.5 mt-10 rounded-full text-white  '>
        <p onClick={()=> setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 rounded-full cursor-pointer text-black px-8 py-2'>Generate Another</p>
        <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer ' download  href={image}>Download</a>
      </div>}
    </motion.form>
    </>
    )
}

export default Result

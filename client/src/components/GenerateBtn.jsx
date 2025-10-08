import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/useContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
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
      <div className='flex flex-col items-center justify-center  '>
         <h1 className='text-3xl  font-semibold '>See the magic. Try now </h1>

         <button onClick={onClickHandler} className='flex gap-2 items-center justify-center hover:scale-105 transition-all duration-500  m-10 mb-20 border px-8 py-2.5 bg-black text-white  rounded-full cursor-pointer  '>
            Generate Images
            <img className='h-6  ' src={assets.star_group} alt="" />
         </button>
      </div>
    </>

  )
}

export default GenerateBtn

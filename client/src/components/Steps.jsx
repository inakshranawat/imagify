import React from 'react'
import {  stepsData } from '../assets/assets'

const Steps = () => {
  return (
  <>
   <div className='flex flex-col items-center justify-center '>
      <h1 className='text-3xl font-semibold mb-2'>How it works </h1>

      <p className='text-lg text-gray-600 mb-8 '>Transform Words into the Stunning Images  </p>

      <div className='space-y-4 w-full max-w-3xl '>
        {stepsData.map((item,index)=>{
            return (
              <div className='flex items-center gap-4 shadow-md cursor-pointer rounded-lg  hover:scale-105 transition-all duration-300 p-5 px-8 bg-white/50' key={index}>
                <img width={40} src={item.icon} alt="" />
                <div>
                  <h2 className='font-medium '> {item.title} </h2>
                  <p className='text-gray-500'>{item.description}</p>
                </div>
              </div>
                
            )
        })}
      </div>
   </div>
  </>
  )
}

export default Steps

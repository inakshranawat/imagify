import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
   <>
     <div className='flex flex-col items-center justify-center my-24 p-6'>
        <h1 className='text-3xl font-semibold mb-2 '>Create AI Images</h1>
        <p className='text-gray-500 mb-8 '>Turn your imagination into the visuals </p>

        <div className='flex items-center justify-between gap-15'>
            <img className='w-80 rounded-lg ' src={assets.sample_img_1} alt="" />
            <div >
                <h2 className='text-3xl font-medium mb-4'>Introducing the AI-Powered Text to Image Generator </h2>

                <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. whether you need stunning visuals or unique imagery, our tools transform your text into the eye-catching images with just a few clicks. Imagine it , describe it and watch it come to life instantly.</p>

                <p className='text-gray-600'>Simply type in the text prompt and our cutting-edge AI will generate high quality images seconds .From product visuals to character designs and portraits , even the concept did not yet exists can be visualized effortlessly. Powered by advanced AI technology ,the creative possibilites are limitless</p>
            </div>
        </div>
     </div>
   </>
  )
}

export default Description

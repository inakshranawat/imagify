

import userModel from "../models/userModel.js"
import FormData from "form-data"
import axios from "axios"



export const generateImage = async (req , res)=>{
    try {
        const userId = req.user.id 
        const{prompt} = req.body 

        if(!userId || !prompt){
            return res.json({success: false , message: "Missing details"})
        }

        const user = await userModel.findById(userId)
        
        if(user.creditBalance === 0 || user.creditBalance < 0){
            return res.json({success:false , message:'No Credit Balance '})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} =  await axios.post('https://clipdrop-api.co/text-to-image/v1',formData, {
            headers:{
                'x-api-key': process.env.CLIPDROP_API_KEY
            },
            responseType:"arraybuffer"
             
        })
        const base64Image = Buffer.from(data, "binary").toString("base64")

        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(userId , {creditBalance:  user.creditBalance -1})

        return res.json({success: true , resultImage, message:"Image generated",  creditBalance: user.creditBalance -1})




    } catch (error) {
        return res.json({success:false , message: error.message})
        
    }
}
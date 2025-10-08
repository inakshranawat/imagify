import mongoose from 'mongoose'
import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionMode.js'

export const registerUser = async (req , res)=>{
    const {name,email,password} = req.body

    try {
        const emailExists = await userModel.findOne({email})
        
        if(emailExists){
            return res.json({success: false, messsage: "Email already exists "})
        }

        // bycrypt the password before saving it into the database
          
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
       
        // create the user in the database 
        const user = await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        // generating the token on the basis of the id 
        
          const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

          return res.json({success: true , token, user:{name:user.name} })
        

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}


export const loginUser = async (req , res)=>{
    const{email,password} = req.body

    try {
         const user = await userModel.findOne({email})
         if(!user){
            return res.json({success:false , message: "wrong email"})
         }

         const isMatch = await bcrypt.compare(password,user.password)
         if(isMatch){
             
             const token =  jwt.sign({id: user._id} , process.env.JWT_SECRET)
             
              return res.json({success:true, token , user:{name:user.name}})

         }else{
            return res.json({success:false , message: "Incorrect Password"})
         }
        
    } catch (error) {
        return res.json({success: false , message: error.message})
        
    }
}


export const userCredits = async (req , res)=>{
    const userId = req.user.id
    try {
        const user = await userModel.findById(userId)
        
        return res.json({success: true , credits:user.creditBalance , user:{name:user.name}})
        
    } catch (error) {
       return res.json({success: false , message: error.message})
        
    }
}

 //creting the instance for the id and the secret 
const razorpayInstance = new razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET
})

//controller function for the paymentRazorpay

export const paymentRazorpay = async (req , res )=>{
    try {
        const userId = req.user.id 
        const {planId} = req.body 

        const userData = await userModel.findById(userId)

        if(!userId || !planId){
           return res.json({success: false , message: "Missing Details"})
        }
        
        let credits , plan , amount , date

        switch (planId) {
            case "Basic":
                plan = "Basic"
                credits = 100
                amount = 10
                break;

            case "Advanced":
                 plan = "Advanced"
                 credits = 500
                 amount = 50
                 break

           case "Business":
                plan = "Business"
                credits = 5000
                amount = 250
                break;
        
            default:
                  return res.json({success: false , message: "plan not found "})
            
        }
        date = Date.now()


        const transactionData = {
            userId , credits , amount , plan , date 
        }

        const newTransaction = await transactionModel.create(transactionData)
        
        const options = {
            amount: amount *100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }
         razorpayInstance.orders.create(options , (error , order)=>{
             if(error){
                console.log(error)
                return res.json({success: false , message: error.message})
             }
             return res.json({success: true , order})
        })


    } catch (error) {
        console.log(error.message)
        return res.json({success: false , message: error.message})
        
    }
}


export const verifyRazorpay = async (req ,res)=>{
    try {
        
        const {razorpay_order_id} = req.body 
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === "paid"){
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            if(transactionData.payment){
                return res.json({success: false , message: "Payment Failed "})
            }

            const userData = await userModel.findById(transactionData.userId)


            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id , {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id , {payment: true})

            return res.json({success: true , message: "credits Added "})
        }else{
            return res.json({success: false , message: "payment failed "})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success: false , message: error.message})
    }
}
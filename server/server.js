import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const app = express()
await connectDB()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || "https://imagiify.onrender.com"

app.get('/',(req ,res)=>{
   res.send("api is working ")
})
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)


app.listen(port , ()=>{
   console.log(`server is running on the port: ${port}`)
})


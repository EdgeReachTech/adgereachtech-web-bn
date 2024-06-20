import connection from './config/db'
import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRoutes'

dotenv.config()

const PORT = process.env.PORT
connection()
.then(()=>console.log('database connected successfully'))
.catch((error: any)=> console.log(error))
const app = express()
app.use(express.json())
app.get('/',(req, res)=>{
    res.send('welcome to edge-reach tech website')
})
app.use('/user',userRouter)
app.listen(PORT,()=>{
    console.log(`app is listening to ${PORT}`)
})

import connection from './config/db'
import express from 'express'
const PORT = process.env.PORT
connection.authenticate()
.then(()=>console.log('database connected successfully'))
.catch((error: any)=> console.log(error))
const app = express()
app.use(express.json())
app.get('/',(req, res)=>{
    res.send('welcome to edge-reach tech website')
})
app.listen(PORT,()=>{
    console.log(`app is listening to ${PORT}`)
})

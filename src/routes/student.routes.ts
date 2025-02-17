import express from 'express'
import StudentController from '../controllers/student.Controller'
import { isLoggedIn } from '../middleware/authentication'
const studentRouter = express.Router()
studentRouter.post('/',StudentController.apply)
studentRouter.get('/',isLoggedIn, StudentController.all)
export default studentRouter
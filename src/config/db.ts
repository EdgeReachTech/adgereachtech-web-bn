import { Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const connection =  new Sequelize(process.env.DB_NAME_TEST!,
     process.env.DB_USER_TEST!,
     process.env.DB_PASSWORD_TEST!,{
     host: process.env.DB_HOST_TEST!,
     dialect:"mysql"
     })

export default connection
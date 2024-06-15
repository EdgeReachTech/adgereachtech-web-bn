import dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = {
  
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    
    host: process.env.DB_HOST_TEST,
    dialect: 'mysql'
  },
  
  development: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: 'mysql'
  },
  
  production: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: 'mysql'
  }
  
}

export default config[env];

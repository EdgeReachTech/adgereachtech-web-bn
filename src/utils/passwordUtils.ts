import bcrypt from 'bcrypt'
export const hashingPassword =async (password:any) => {
 
    const salt = 10
    try{
     const hashedPassword = await bcrypt.hash(password,salt)
     return hashedPassword
    }
    catch(error){
        return error
    }

}
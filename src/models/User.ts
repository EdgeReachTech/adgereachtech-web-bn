import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'

export interface UserAttrubutes{
    id:number,
    firstName:string,
    lastName:string,
    location:string,
    dateOfBirth:Date,
    status:string,
    role:string,
    gander:string,
    isverified:boolean,
    verifiedAt:Date,
    password:string

}
 interface userCreationAttributes extends Optional<UserAttrubutes, 'id'>{}

 class User extends Model<UserAttrubutes,userCreationAttributes> implements UserAttrubutes{
    
    public id!:number
    public firstName!:string
    public lastName!:string
    public  location!:string
    public  dateOfBirth!:Date
    public status!:string
    public role!:string
    public gander!:string
    public isverified!:boolean
    public verifiedAt!:Date
    public password!: string;
    public readonly createdAt!:Date
    public readonly updatedAt!:Date
 }

 User.init({
    id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
    },
    firstName:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    lastName:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    location:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    dateOfBirth:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    status:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    role:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    gander:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    isverified:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
    verifiedAt:{
        type:DataTypes.STRING(50),
        allowNull:false
       },
       password:{
        type:DataTypes.STRING,
        allowNull:false
       }
 },{
 sequelize,
 tableName:'users',
 timestamps:true
}

)
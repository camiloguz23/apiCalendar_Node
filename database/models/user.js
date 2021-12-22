import mongoose from 'mongoose'
const {Schema,model} = mongoose

export const user_schema = Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})

export default model("User_db",user_schema)

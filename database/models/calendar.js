import mongoose from 'mongoose'
const {Schema,model} = mongoose

const calendar_schema = Schema({

    title: {
        type: String,
        required: true
    },

    notes: {
        type:String,   
    },

    start:{
        type: Date,
        required:true
    },

    end:{
        type:Date,
        required:true
    }
})

export default model("Calendar",calendar_schema)
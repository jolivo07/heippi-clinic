import {Schema, model} from 'mongoose'

const doctorSchema = new Schema({
    hospitalID: {
        type: String,
        trim: true
    },
    identification: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    change:{
        type: Boolean,
        default: false
    }
   
},{
    timestamps: true,
    versionKey: false
})

export default model('Doctor', doctorSchema)
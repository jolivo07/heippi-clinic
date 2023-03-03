import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    identification: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
   
},{
    timestamps: true,
    versionKey: false
})

export default model('User', userSchema)
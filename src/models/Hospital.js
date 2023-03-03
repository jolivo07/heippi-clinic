import {Schema, model} from 'mongoose'

const hospitalSchema = new Schema({
    userID:{
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: false,
    },
    services: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
    versionKey: false
})

export default model('Hospital', hospitalSchema)
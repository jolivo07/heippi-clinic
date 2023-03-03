import {Schema, model} from 'mongoose'

const patientSchema = new Schema({
    userID: {
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
    birthDate: {
        type: Date,
        required: true,
    },
},{
    timestamps: true,
    versionKey: false
})

export default model('Patient', patientSchema)
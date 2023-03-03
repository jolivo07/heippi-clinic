import mongoose, {Schema, model} from 'mongoose'

const observationSchema = new Schema({
    doctorID:{
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    patientID:{
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true 
    },
    description: {
        type: String,
    },
    state: {
        type: String,
    },
},{
    timestamps: true,
    versionKey: false
})

export default model('Observation', observationSchema)
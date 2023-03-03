import User from '../models/User'
import Doctor from '../models/Doctor'
import Patient from '../models/Patient'
import Observation from '../models/Observation'
import Hospital from '../models/Hospital'
const { ObjectId } = require('mongodb');

export const renderDoctor = async(req, res)=>{
    let doctor = await Doctor.findById(req.params.id).lean()
    let patients = await Patient.find().lean()

    res.render('doctor', {doctor: doctor, patients: patients})
}

export const renderRegDoctor = async(req, res)=>{
    let hospital = await Hospital.findById(req.params.id).lean()
    res.render('regDoctor', {hospital})
}

export const signUpDoctor = async(req,res)=>{
    const user = await User.find().lean()
    const doctors = await Doctor.find().lean()
    const hospital = await Hospital.findById(req.params.id).lean()
    let dc = {
        hospitalID: req.params.id,
        identification: req.body.identification,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    if (dc.identification == "" || dc.name == "" || dc.phone == "" || dc.email == "" || dc.password == "" ) {
        
         res.render('regDoctor', {hospital, errorIncomplete: "You need to fill in all the fields"})
        return
    }
    for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].identification === dc.identification) {
            return  res.render('regDoctor', {hospital, error: "This ID is already used by a Doctor"})
        }
    }
    
    for (let i = 0; i < user.length; i++) {
        if (user[i].identification === dc.identification) {
            return  res.render('regDoctor', {hospital, error: "This ID is already used by a User"})
        }
    }
  
    for (let i = 0; i < user.length; i++) {
        if (user[i].identification !== dc.identification) {
            const doctor = Doctor(dc)
            await doctor.save()
            return res.redirect('/')
        }
    }
  
} 

export const renderFirstChangePassword = async(req, res)=>{
    res.render('changePassword', {doctorID: req.params.id})
}

export const changeFirstPassword = async(req, res)=>{
    let doct = await Doctor.findById(req.params.id)
    if (doct.password === req.body.password && req.body.nPassword != "") {
        await Doctor.findByIdAndUpdate(req.params.id, {change: true, password: req.body.nPassword})
        return res.redirect('/doctor/'+ req.params.id)
    }else{
        return res.render('changePassword', {doctorID: req.params.id, error: "Password Incorrect or Complete new password"})
    }
    
   
}

export const renderChangePasswordDoctor = async(req, res)=>{
    res.render('changePasswordDoctor', {doctorID: req.params.id})
}

export const changePasswordDoctor = async(req, res)=>{
    let {password, nPassword} = req.body
    let doctor = await Doctor.findById(req.params.id)

    if (doctor.password === password && nPassword != "") {
        await Doctor.findByIdAndUpdate(doctor._id,{password: nPassword})
        res.redirect('/doctor/'+doctor._id)
    }else{
        res.render('changePasswordDoctor', {doctorID: req.params.id, error: "Password Incorrect or Complete new password"})
    }
}

export const renderRegObservations = async(req, res) =>{
    res.render('regObservation', {doctorID: req.params.docID, patientID: req.params.patID})
}

export const regObservation = async(req, res) =>{
    let {description, state} = req.body
    let ob = {
        doctorID: req.params.docID,
        patientID: req.params.patID,
        description: description,
        state: state
    }
    if (ob.description == "" || ob.state == "") {
        res.render('regObservation', {doctorID: req.params.docID, patientID: req.params.patID, error: "You need to fill in all the fields"})
    }else{
        let observation = Observation(ob)
        await observation.save()
        res.redirect('/doctor/'+req.params.docID)
    }
  
}

export const consultDoctor = async(req, res) =>{
    let doctorID = ObjectId(req.params.docID) 
    let doc = await Doctor.findById(req.params.docID).lean()
    let hospital = await Hospital.findById(doc.hospitalID).lean()
    let observation = await Observation.aggregate(
        [
            {
                $lookup:
                {
                    from: "patients",
                    localField: "patientID",
                    foreignField: "_id",
                    as: "observationPatients"
                }
            },
            {$unwind: "$observationPatients"},
            {$match: {doctorID: doctorID}}
        ]
    )
    res.render('consultDoctor', {observations: observation, hospital, doctor: doc})
}
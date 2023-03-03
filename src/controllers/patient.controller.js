const { ObjectId } = require('mongodb');
import Observation from '../models/Observation'
import Patient from '../models/Patient'
import User from '../models/User'

export const renderPatient = async(req, res)=>{
    let patient = await Patient.find({userID: req.params.id}).lean()
    console.log("---->>",req.params.id)
    res.render('patient' , {patient: patient[0]})
}

export const renderChangePasswordPatient = async(req, res)=>{
    let patient = await Patient.findById(req.params.id).lean()
    res.render('changePaswordPatient', {patient})
}

export const changePasswordPatient = async(req, res)=>{
    let patient = await Patient.findById(req.params.id).lean()
    let {password, nPassword} = req.body
    let pat = await Patient.findById(req.params.id)
    let us = await User.findById(pat.userID)
    if (us.password === password && nPassword != "") {
        await User.findByIdAndUpdate(us.id, {password: nPassword})
        res.redirect('/patient/'+us.id)
    }else{
        res.render('changePaswordPatient', {patient, error: "Password Incorrect or Complete new password"})
    }
}

export const signUpPatient = async(req, res) =>{
    let pt = {
        userID: req.params.id,
        name: req.body.name,
        address: req.body.address,
        birthDate: req.body.birthdate
    }

    if (pt.name == "" || pt.address == "" || pt.birthDate == "") {
        res.render('regPatient', {userID: req.params.id, error: "You need to fill in all the fields"})
    }else{
        await User.findByIdAndUpdate(req.params.id, {completed: true})
        const patient = Patient(pt)
        await patient.save()
        res.redirect('/patient/'+req.params.id)
    }
   
}

export const consutlPatient = async(req, res) =>{
    let patientID = ObjectId(req.params.id) 
    let patient = await Patient.findById(req.params.id).lean()
    let observations = await Observation.aggregate(
        [
            {
                $lookup:
                {
                    from: "doctors",
                    localField: "doctorID",
                    foreignField: "_id",
                    as: "observationPatients"
                }
            },
            {$unwind: "$observationPatients"},
            {$match: {patientID: patientID}}
        ]
    )
    res.render('consultPatient', {observations: observations, patient})
}
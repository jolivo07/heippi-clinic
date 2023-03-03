import Hospital from '../models/Hospital'
import User from '../models/User'
import Observation from '../models/Observation';


export const renderHospital = async(req, res)=>{
    let hospital = await Hospital.find({userID: req.params.id}).lean()
    res.render('hospital', {hospital: hospital[0]})
}

export const renderChangePassword = async(req, res)=>{
    let hospital = await Hospital.findById(req.params.id).lean()
    res.render('changePasswordHospital', {hospital})
}

export const changePassword = async(req, res)=>{
    let {password, nPassword} = req.body
    let hospital = await Hospital.findById(req.params.id).lean()
    let hos = await Hospital.findById(req.params.id)
    let us = await User.findById(hos.userID)
    if (us.password === password && nPassword != "") {
        await User.findByIdAndUpdate(us._id, {password: nPassword})
        res.redirect('/hospital/'+us._id)
    }else{
        res.render('changePasswordHospital', {hospital, error: "Password Incorrect or Complete new password"})
    }
}

export const signUpHospital = async(req, res) =>{
    let hs = {
        userID: req.params.id,
        name: req.body.name,
        address: req.body.address,
        services: req.body.services
    }
    if (hs.name == "" || hs.address == "" || hs.services == "") {
        res.render('regHospital', {userID: req.params.id ,error: "You need to fill in all the fields"})
    }else{
        await User.findByIdAndUpdate(req.params.id, {completed: true})
        const hospital = Hospital(hs)
        await hospital.save()
        res.redirect('/hospital/'+req.params.id)
    }
    
}

export const consultHospital = async(req, res)=>{
    let hospitalID = req.params.id
    let hospital = await Hospital.findById(hospitalID).lean()
    
    let observations = await Observation.aggregate(
        [
            {
                $lookup:
                {
                    from: "doctors",
                    localField: "doctorID",
                    foreignField: "_id",
                    as: "observationDoctors"
                }
            },
            {$unwind: "$observationDoctors"}
        ]
    )

    res.render('consultHospital', {observations:observations, hospital})
}
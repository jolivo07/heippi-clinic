import User from '../models/User'
import Doctor from '../models/Doctor'

export const renderLogIn = async (req, res) =>{
    res.render('index')
}

export const logIng = async(req, res) =>{
    const {identification, password} = req.body
    const user = await User.find()
    const doctors = await Doctor.find().lean()
    for (let i = 0; i < user.length; i++) {
        if (user[i].identification === identification && user[i].password === password) {
            const u = await User.find({identification:identification}).lean()
            if (u[0].type === "Hospital" && !u[0].completed) {
               return res.render('regHospital', {userID: u[0]._id})
            }
            if (u[0].type === "Hospital" && u[0].completed) {
                return res.redirect('/hospital/'+u[0]._id)
            }
            if (u[0].type === "Patient" && !u[0].completed) {
                return res.render('regPatient', {userID: u[0]._id})
             }

            if (u[0].type === "Patient" && u[0].completed) {
                return res.redirect('/patient/'+u[0]._id)
            }
         return
        }
    }
    for (let i = 0; i < doctors.length; i++) {
       if (doctors[i].identification === identification && doctors[i].password === password) {
        const d = await Doctor.find({identification:identification}).lean()
        if (!d[0].change) {
            return res.redirect('/changePassword/'+ d[0]._id)
        }
        if (d[0].change) {
            return res.redirect('/doctor/'+d[0]._id)
        }
        return
       }
        
    }
    if (doctors.length > 0) {
        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].identification !== identification || doctors[i].password !== password) {
                return res.render('index', {error: "Identification or Password Incorrect"})
            }
        }
    }
   
    if (user.length > 0) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].identification !== identification || user[i].password !== password) {
                return res.render('index', {error: "Identification or Password Incorrect"})
            }
        }
    }

    if (user.length == 0) {
        return res.render('index', {error: "Identification or Password Incorrect"})
    }
   
}

export const renderSingUp = (req, res) =>{
    res.render('signUp')
}
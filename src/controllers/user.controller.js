import User from '../models/User'
import Doctor from '../models/Doctor'


export const singUpUser = async(req, res) =>{

    const user = await User.find().lean()
    const doctors = await Doctor.find().lean()
    let {identification, password} = req.body

    if (doctors.length > 0) {
        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].identification === identification) {
                return  res.render('signUp', {hospitalID: req.params.id, error: "This ID is already used by a Doctor"})
            }
        }
    }
  
    if (user.length > 0) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].identification === identification) {
                return  res.render('signUp', {hospitalID: req.params.id, error: "This ID is already used by a User"})
            }
        }
    }
   
    if (user.length === 0) {
        if (identification === "" || password === "") {
             res.render('signUp', {hospitalID: req.params.id, errComplete: "You need to fill in all the fields"})
        }else{
            const us = User(req.body)
            await us.save()
            res.redirect('/')
            
        }
        return
    }
 
    if (user.length > 0) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].identification !== identification) {
                if (identification === "" || password === "") {
                    return res.render('signUp', {hospitalID: req.params.id, errComplete: "You need to fill in all the fields"})
                }
                const us = User(req.body)
                await us.save()
                res.redirect('/')
                return
            }
        }
    }
      
 

  
    

   


}
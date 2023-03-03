import { Router } from "express";
import { logIng, renderLogIn, renderSingUp } from "../controllers/index.controller";
import { singUpUser } from "../controllers/user.controller";
import {  changePassword, consultHospital, renderChangePassword, renderHospital, signUpHospital } from "../controllers/hospital.controller";
import { changePasswordPatient, consutlPatient, renderChangePasswordPatient, renderPatient, signUpPatient } from "../controllers/patient.controller";
import { changeFirstPassword, changePasswordDoctor, consultDoctor, regObservation, renderChangePasswordDoctor, renderDoctor, renderFirstChangePassword, renderRegDoctor, renderRegObservations, showObservation, signUpDoctor } from "../controllers/doctor.controller";


const router = Router()
router.get("/", renderLogIn)
router.post("/logIn", logIng)
router.get("/singUp",renderSingUp )
router.post("/singUp-user", singUpUser)

router.get('/hospital/:id', renderHospital)
router.get('/changePasword-hospital/:id', renderChangePassword )
router.post('/changePasword-hospital/:id', changePassword)
router.post("/singUp-hospital/:id", signUpHospital)
router.get("/consultHospital/:id", consultHospital)

router.get('/patient/:id', renderPatient)
router.get('/changePasword-patient/:id', renderChangePasswordPatient)
router.post('/changePasword-patient/:id', changePasswordPatient)
router.post("/singUp-patient/:id", signUpPatient)
router.get("/consultPatient/:id", consutlPatient)


router.get('/doctor/:id', renderDoctor)
router.get('/regDoctor/:id', renderRegDoctor)
router.post('/singUp-doctor/:id', signUpDoctor)
router.get('/changePassword/:id', renderFirstChangePassword)
router.post('/changePassword/:id', changeFirstPassword)
router.get('/changePasword-doctor/:id', renderChangePasswordDoctor)
router.post('/changePasword-doctor/:id', changePasswordDoctor)
router.get('/regObservation/:docID/:patID', renderRegObservations)
router.post('/regObservation/:docID/:patID', regObservation)
router.get('/consultDoctor/:docID', consultDoctor)

















export default router
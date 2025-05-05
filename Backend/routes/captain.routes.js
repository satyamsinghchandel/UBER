const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const captainController = require('../controllers/captain.controller')
const authMiddileware = require("../middilewares/auth.middileware")

router.post('/register', [
        body('email').isEmail().withMessage('Invalid Email'),
        body("fullname.firstname").isLength({min:3}).withMessage('Firstname must be atleast 3 characters'),
        body('password').isLength({min:6}).withMessage("password must be at least 6 characters"),
        body('vehicle.color').isLength({min:3}).withMessage("color must be atleast 3 characters"),
        body('vehicle.plate').isLength({min:5}).withMessage("plate number must be atleast 5 characters"),
        body('vehicle.capacity').isInt({min:1}).withMessage("capacity must be atleast 1 "),
        body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid vehicle type"),
    ], 
    captainController.registerCaptain
  
)

router.post('/login', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min:6}).withMessage("password must be at least 6 characters"),
    ],
    captainController.loginCaptain
)


router.get('/profile', authMiddileware.authCaptain, captainController.getCaptainProfile)
router.get('/logout', authMiddileware.authCaptain, captainController.logoutCaptain)
module.exports = router;
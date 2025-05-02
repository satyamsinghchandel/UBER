const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller')
router.post("/register", 
    // checking for validation errors
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast three characters long"),
    body('password').isLength({min: 3}).withMessage('Password must be atleast 6 characters long')
], 
// then calling the controller function

userController.registerUser
)

router.post("/login", 
    // validation for login
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({min:6}).withMessage('password length must contain atleast 6 characters')
    ],
    userController.loginUser

)
module.exports = router;
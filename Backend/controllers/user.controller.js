const userModel = require('../models/user.model')
const userService  = require('../Services/user.services')
const {validationResult} = require('express-validator')
const blackListTokenModel = require("../models/blacklistToken.model")
module.exports.registerUser = async(req, res, next)=>{

    // saves error from request (array we passed in user controller post operation)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
        res.status(400).json({message: "User alreay exist"})
    }

    const hashedPassword = await userModel.hashPassword(password)
     
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    }) 
    
    const token  = user.generateAuthToken()
    
    res.status(201).json({token, user})

}

module.exports.loginUser = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    // select('+password') to get the password present in the req body because we have used select = false so by default we cannot acess password
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        res.status(401).json({message: 'Invalid Email or Password'})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        res.status(401).json({message: "Invalid Email or Password"})
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({token, user})
}

module.exports.getUserProfile = async (req, res, next)=>{
    res.status(200).json(req.user)
} 

module.exports.logoutUser = async (req,res,next)=>{
    
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    res.clearCookie('token')
    await blackListTokenModel.create({token})
    res.status(200).json({message: "Logged out"})
}
const userModel = require('../models/user.model')
const userService  = require('../Services/user.services')
const {validationResult} = require('express-validator')
module.exports.registerUser = async(req, res, next)=>{

    // saves error from request (array we passed in user controller post operation)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password} = req.body;

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
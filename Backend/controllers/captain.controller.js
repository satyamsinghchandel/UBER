const captainModel = require("../models/captains.models")
const captainService = require("../Services/captain.services")
const {validationResult} = require("express-validator")
module.exports.registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password, vehicle} = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({email})
    if(isCaptainAlreadyExist){
        return res.status(400).json({message: "Captain alreay exist"})
    }
    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color: vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType: vehicle.vehicleType
        
    })

    const token = captain.generateAuthToken()

    res.status(201).json({token, captain})
}
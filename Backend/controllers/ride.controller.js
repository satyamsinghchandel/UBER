const rideService = require('../Services/ride.service');
const { validationResult} = require('express-validator')
const mapService = require('../Services/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { userId, pickup, destination, vehicleType } = req.body;
    
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token from Authorization header:", token);

    

    try{
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        })
        res.status(201).json({message: 'Ride created successfully', ride});

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates);

        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        console.log("Captains in radius:", captainsInRadius);
        ride.otp="";

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');
        console.log(rideWithUser);
        captainsInRadius.map((captain)=>{
            sendMessageToSocketId(captain.socketId,'new-ride', rideWithUser
            );
            console.log("ride notification send")
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { pickup, destination } = req.query;
    
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { rideId } = req.body;
    
    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain});
        if(!ride) {
            return res.status(404).json({message: 'Ride not found'});
        }
        sendMessageToSocketId(ride.user.socketId, 'ride-confirmed', ride);
        return res.status(200).json({message: 'Ride confirmed successfully', ride});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { rideId, otp } = req.query;
    
    try {
        const ride = await rideService.startRide({rideId, otp, captain: req.captain});
        
        
        sendMessageToSocketId(ride.user.socketId, 'ride-started', ride);
        return res.status(200).json({message: 'Ride started successfully', ride});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { rideId } = req.body;
    
    try {
        const ride = await rideService.endRide({rideId, captain: req.captain});
        
        sendMessageToSocketId(ride.user.socketId, 'ride-ended', ride);
        return res.status(200).json({message: 'Ride ended successfully', ride});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}
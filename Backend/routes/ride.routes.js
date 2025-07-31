const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middilewares/auth.middileware');
router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Location'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid Vehicle Type'),

    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Location'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
    rideController.getFare
)

router.post('/confirm', 
    authMiddleware.authCaptain, 
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    rideController.confirmRide
    )

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid Ride ID'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    rideController.endRide
)

module.exports = router
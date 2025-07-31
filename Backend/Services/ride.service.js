const rideModel = require('../models/ride.model');
const mapController = require('../controllers/map.controller');
const mapService = require('../Services/maps.service');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and Destination are required');
    }
    
    const pickup_coordinates = await mapController.geocodeLocation(pickup);
    const destination_coordinates = await mapController.geocodeLocation(destination);
    
    
    if (!pickup_coordinates || !destination_coordinates) {
        throw new Error('Invalid Pickup or Destination location');
    }

    const distanceTime = await mapService.getDistanceTime(pickup_coordinates, destination_coordinates);
    
    console.log('Distance and Time:', distanceTime);
    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Unable to calculate distance and time');
    }

    const baseFare = {
        auto: 20,
        car: 35,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };
    
    const perMinuteRate = {
        auto: 1,
        car: 2,
        motorcycle: 1
    };
    
    // Convert distance to number for calculation
    const distance = parseFloat(distanceTime.distance);
    const duration = parseInt(distanceTime.duration);
    
    const fare = {
        auto: Math.round(baseFare.auto + (distance * perKmRate.auto) + (duration * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distance * perKmRate.car) + (duration * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + (distance * perKmRate.motorcycle) + (duration * perMinuteRate.motorcycle))
    };
    
    return fare;
}
module.exports.getFare = getFare;

function getOtp(num){
    function generateOTP(num){
        const otp = crypto.randomInt(Math.pow(10,num-1), Math.pow(10,num)).toString();
        return otp;
    }

    return generateOTP(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!pickup || !destination || !vehicleType) {
        throw new Error('Pickup, Destination and Vehicle Type are required');
    }
    
    // Validate vehicleType
    const validVehicleTypes = ['auto', 'car', 'motorcycle'];
    if (!validVehicleTypes.includes(vehicleType)) {
        throw new Error('Invalid vehicle type. Must be one of: auto, car, motorcycle');
    }

    const fare = await getFare(pickup, destination);
    
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });
    console.log(user);
    return ride;
};

module.exports.confirmRide = async ({rideId,captain}) => {
    if (!rideId ) {
        throw new Error('Ride ID is required');
    }
    
    await rideModel.findOneAndUpdate({
        _id: rideId
      },
      {
        status:'accepted',
        captain: captain._id
      }
    )
    
    
    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('user').populate('captain').select('+otp');
    
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}


module.exports.startRide = async ({rideId, otp, captain}) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }
    
    const ride = await rideModel.findOne({
        _id: rideId,
    }).populate('user').populate('captain').select('+otp');

    console.log("Ride found:", ride);

    if (!ride) {
        throw new Error('Invalid Ride ID or OTP');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride is not in accepted status');
    }

    if(ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId
      },
      {
        status:'ongoing',
      }
    )


    return ride;
}

module.exports.endRide = async ({rideId, captain}) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }
    
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not in ongoing status');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
      },
      {
        status:'completed',
      }
    )

    return ride;
}
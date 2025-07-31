const mongoose = require('mongoose');


// Define the ride schema
const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup:{
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,   // in seconds           
    },
    distance: {
        type: Number,   // in meters
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature:{
        type: String,
    },
    otp:{
        type:String,
        select: false, // Do not select OTP by default
    }
 
})

module.exports = mongoose.model('ride', rideSchema);
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, "Firstname must contain atleast 3 characters"]
        },
        lastname:{
            type:String,
            minlength: [3, "Lastname must contain atleast 3 characters"]
        }
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password:{
        type:String,
        required: true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength: [3, 'color must contain atleast 3 character']
        },
        plate:{
            type:String,
            required: true,
            minlength: [5, "plate must be atleast 5 characters"]
        },
        capacity:{
            type:Number,
            required: true,
            min:[1,'Capacity must be atleast 1']
        },
        vehicleType:{
            type:String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location:{
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        }
    }
})


captainSchema.methods.generateAuthToken =  ()=>{
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

captainSchema.methods.comparePassword = async (password)=>{
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async (password)=>{
    return bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel;
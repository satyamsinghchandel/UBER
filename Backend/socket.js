const { Server } = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captains.models');


let io = null;

/**
 * Initializes socket.io with the given HTTP server.
 * @param {http.Server} server 
 */
function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust as needed for security
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('connected to:', socket.id);

        socket.on('join', async(data)=>{
            const {userType, userId} = data;
            
            if(userType==='user'){
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id})
                console.log(`User ${userId} joined as ${userType}, `);
            }if(userType==='captain'){
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id})
                console.log(`User ${userId} joined as ${userType}, `);
            }
        })

        socket.on('update-location-captain', async(data)=>{
            const {userId, location} = data;

            if(!userId || !location || !location.ltd || !location.lng) {
                console.error('Invalid data for update-location-captain:', data);
                return;
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
            
        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

/**
 * Sends a message to a specific socket ID.
 * @param {string} socketId 
 * @param {string} event 
 * @param {any} message 
 */
function sendMessageToSocketId(socketId, event, message) {
    if (io) {
        io.to(socketId).emit(event, message);
        console.log("sending notification to the captain")
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
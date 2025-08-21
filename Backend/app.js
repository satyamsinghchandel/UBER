// dotenv used to secure port and other credentials
const dotenv = require('dotenv');
dotenv.config();

// used to show the data on the allowed domains
const cors = require('cors');
const express = require('express');
const app = express();
const connnectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require("cookie-parser");
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connnectToDb();

// ✅ CORS setup for production frontend
const corsOptions = {
    origin: "https://your-frontend.vercel.app", // replace with your Vercel URL
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true // allow cookies/auth headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("hello world");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;

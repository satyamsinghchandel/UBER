// dotenv used to secure port and other credentials
const dotenv = require('dotenv');
dotenv.config();
// used to show the data on the allowed domains
const cors = require('cors');
const express = require('express')
const app = express();
const connnectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const cookieParser = require("cookie-parser")

connnectToDb();
// for safe communication between frontend and backend
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/', (req, res)=>{
    res.send("hello world");
})

app.use('/users', userRoutes)
app.use('/captains',captainRoutes)

module.exports = app;
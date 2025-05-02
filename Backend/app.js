// dotenv used to secure port and other credentials
const dotenv = require('dotenv');
dotenv.config();
// used to show the data on the allowed domains
const cors = require('cors');
const express = require('express')
const app = express();
const connnectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')

connnectToDb();
// for safe communication between frontend and backend
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res)=>{
    res.send("hello world");
})

app.use('/users', userRoutes)

module.exports = app;